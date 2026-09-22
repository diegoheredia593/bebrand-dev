'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { FieldRenderer } from './field-renderer';
import { brand } from '@/lib/bebrand-content';
import type { LeadAnswers, LeadAnswerValue } from '@/lib/leads';
import { ALL_STEPS, CONTACT_STEP, TOTAL_STEPS, buildStepPatch, validateStep, visibleFields } from '@/lib/project-form-steps';

const STORAGE_KEY = 'bebrand-lead-id';

type WizardStatus = 'loading' | 'active' | 'completed';

const CONTACT_METHOD_LABEL: Record<string, string> = {
  whatsapp: 'WhatsApp',
  llamada: 'una llamada',
  correo: 'correo',
};

function firstName(fullName: string | LeadAnswerValue | undefined) {
  if (typeof fullName !== 'string') return '';
  const trimmed = fullName.trim();
  return trimmed ? trimmed.split(/\s+/)[0] : '';
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function ProjectForm() {
  const [status, setStatus] = useState<WizardStatus>('loading');
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<LeadAnswers>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [publicId, setPublicId] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');

  const answersRef = useRef(answers);
  const stepIndexRef = useRef(stepIndex);
  const publicIdRef = useRef(publicId);
  const contactBeaconSentRef = useRef(false);

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);
  useEffect(() => {
    stepIndexRef.current = stepIndex;
  }, [stepIndex]);
  useEffect(() => {
    publicIdRef.current = publicId;
  }, [publicId]);

  // Resume a previous session on this device, if any.
  useEffect(() => {
    let cancelled = false;

    async function init() {
      let storedId: string | null = null;
      try {
        storedId = localStorage.getItem(STORAGE_KEY);
      } catch {
        /* localStorage unavailable — start fresh */
      }

      if (!storedId) {
        setStatus('active');
        return;
      }

      try {
        const res = await fetch(`/api/leads/${storedId}`);
        if (!res.ok) throw new Error('not_found');
        const data = (await res.json()) as {
          status: string;
          currentStep: number;
          answers: LeadAnswers;
        };
        if (cancelled) return;

        setPublicId(storedId);
        setAnswers((prev) => ({ ...prev, ...data.answers }));

        if (data.status === 'completed') {
          setStatus('completed');
          return;
        }

        setStepIndex(clamp(typeof data.currentStep === 'number' ? data.currentStep : 1, 1, TOTAL_STEPS - 1));
        setStatus('active');
      } catch {
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {
          /* ignore */
        }
        if (!cancelled) setStatus('active');
      }
    }

    init();
    return () => {
      cancelled = true;
    };
  }, []);

  // Best-effort flush when the visitor closes the tab or switches away
  // mid-step, without waiting for them to click "Siguiente". Contact-step
  // data uses a one-shot beacon create (bots/duplicate hides are guarded by
  // contactBeaconSentRef); every later step's beacon is a harmless re-save
  // of already-saved data via the same PATCH-equivalent endpoint.
  useEffect(() => {
    function flush() {
      const currentAnswers = answersRef.current;
      const currentPublicId = publicIdRef.current;
      const currentStepIndex = stepIndexRef.current;

      if (!currentPublicId) {
        if (contactBeaconSentRef.current) return;
        const contactErrors = validateStep(CONTACT_STEP, currentAnswers);
        if (Object.keys(contactErrors).length > 0) return;

        contactBeaconSentRef.current = true;
        const payload = {
          name: currentAnswers.name,
          email: currentAnswers.email,
          phone: currentAnswers.phone,
          company: currentAnswers.company,
        };
        try {
          const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
          navigator.sendBeacon('/api/leads', blob);
        } catch {
          /* best effort only */
        }
        return;
      }

      const step = ALL_STEPS[currentStepIndex];
      if (!step || step.id === 'contact') return;
      const patch = buildStepPatch(step, currentAnswers);
      if (Object.keys(patch).length === 0) return;

      try {
        const blob = new Blob([JSON.stringify({ patch })], { type: 'application/json' });
        navigator.sendBeacon(`/api/leads/${currentPublicId}`, blob);
      } catch {
        /* best effort only */
      }
    }

    function onVisibilityChange() {
      if (document.visibilityState === 'hidden') flush();
    }

    window.addEventListener('pagehide', flush);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      window.removeEventListener('pagehide', flush);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  function updateAnswer(id: string, value: LeadAnswerValue) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => {
      if (!(id in prev)) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }

  async function handleContinue() {
    const step = ALL_STEPS[stepIndex];
    const stepErrors = validateStep(step, answers);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});

    if (stepIndex === 0) {
      setSaving(true);
      try {
        const res = await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: answers.name,
            email: answers.email,
            phone: answers.phone,
            company: answers.company,
            website: honeypot,
          }),
        });
        const data = (await res.json().catch(() => ({}))) as { publicId?: string; error?: string };
        if (!res.ok || !data.publicId) {
          setErrors({ _global: data.error ?? 'No pudimos guardar tus datos. Inténtalo de nuevo.' });
          return;
        }
        try {
          localStorage.setItem(STORAGE_KEY, data.publicId);
        } catch {
          /* ignore */
        }
        setPublicId(data.publicId);
        setStepIndex(1);
      } catch {
        setErrors({ _global: 'No pudimos guardar tus datos. Revisa tu conexión e inténtalo de nuevo.' });
      } finally {
        setSaving(false);
      }
      return;
    }

    if (!publicId) {
      setErrors({ _global: 'Perdimos la referencia de tu formulario. Actualiza la página e inténtalo de nuevo.' });
      return;
    }

    const isLast = stepIndex === TOTAL_STEPS - 1;
    const patch = buildStepPatch(step, answers);
    const nextStepIndex = Math.min(stepIndex + 1, TOTAL_STEPS - 1);

    setSaving(true);
    try {
      const res = await fetch(`/api/leads/${publicId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ step: nextStepIndex, patch, completed: isLast }),
      });
      if (!res.ok) {
        setErrors({ _global: 'No pudimos guardar tu respuesta. Inténtalo de nuevo.' });
        return;
      }
      if (isLast) {
        setStatus('completed');
      } else {
        setStepIndex(nextStepIndex);
      }
    } catch {
      setErrors({ _global: 'No pudimos guardar tu respuesta. Revisa tu conexión.' });
    } finally {
      setSaving(false);
    }
  }

  function handleBack() {
    setErrors({});
    setStepIndex((i) => Math.max(0, i - 1));
  }

  if (status === 'loading') {
    return (
      <div className="project-form project-form-loading">
        <span className="eyebrow">CARGANDO</span>
        <p>Recuperando tu progreso…</p>
      </div>
    );
  }

  if (status === 'completed') {
    const methodLabel = CONTACT_METHOD_LABEL[answers.preferredContactMethod as string] ?? 'WhatsApp o correo';
    const name = firstName(answers.name);
    return (
      <div className="project-form project-form-done">
        <CheckCircle2 size={40} aria-hidden="true" />
        <span className="eyebrow">LISTO</span>
        <h2>¡Gracias{name ? `, ${name}` : ''}!</h2>
        <p>Ya tenemos toda la información que compartiste. Nos pondremos en contacto contigo muy pronto por {methodLabel}.</p>
        <a className="pill primary" href={brand.whatsapp} target="_blank" rel="noreferrer">
          <MessageCircle size={18} /> ¿Prefieres hablarlo ya? Escríbenos <ArrowUpRight size={18} />
        </a>
      </div>
    );
  }

  const step = ALL_STEPS[stepIndex];
  const isLast = stepIndex === TOTAL_STEPS - 1;
  const progressValue = (stepIndex / (TOTAL_STEPS - 1)) * 100;

  return (
    <div className="project-form">
      <div className="project-form-progress">
        <span className="eyebrow">
          PASO {stepIndex + 1} DE {TOTAL_STEPS}
        </span>
        <Progress value={progressValue} className="project-form-progress-bar" />
      </div>

      <h2>{step.title}</h2>
      {step.description && <p className="project-form-description">{step.description}</p>}

      <div className="project-form-fields">
        {visibleFields(step, answers).map((field) => (
          <FieldRenderer
            key={field.id}
            field={field}
            value={answers[field.id]}
            onChange={updateAnswer}
            error={errors[field.id]}
          />
        ))}
      </div>

      {errors._global && (
        <p className="field-error project-form-global-error" role="alert">
          {errors._global}
        </p>
      )}

      <div className="project-form-nav">
        {stepIndex > 0 && (
          <button type="button" className="text-link project-form-back" onClick={handleBack} disabled={saving}>
            Atrás
          </button>
        )}
        <button type="button" className="pill primary" onClick={handleContinue} disabled={saving}>
          {saving ? 'Guardando…' : isLast ? 'Enviar' : 'Siguiente'}
          {!saving && <ArrowRight size={16} />}
        </button>
      </div>

      <p className="project-form-autosave-note">Tus respuestas se guardan automáticamente en cada paso.</p>

      {/* Honeypot: hidden from real visitors, some bots still fill it. */}
      <div className="project-form-honeypot" aria-hidden="true">
        <label>
          No completar este campo
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
        </label>
      </div>
    </div>
  );
}
