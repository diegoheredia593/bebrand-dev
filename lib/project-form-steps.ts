import type { LeadAnswers, LeadAnswerValue } from './leads';

export type FieldType = 'text' | 'email' | 'tel' | 'textarea' | 'radio' | 'checkbox' | 'select';

export type FieldOption = { value: string; label: string };

export type ProjectFormField = {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  options?: FieldOption[];
  /** Hidden (and skipped from validation/saving) unless this returns true. */
  showIf?: (answers: LeadAnswers) => boolean;
};

export type ProjectFormStep = {
  id: string;
  title: string;
  description?: string;
  fields: ProjectFormField[];
};

// Step 0: contact capture. Submitting this creates the lead row — from this
// point on, even if the visitor abandons the rest of the form, there is
// already a real contact to follow up with by phone.
export const CONTACT_STEP: ProjectFormStep = {
  id: 'contact',
  title: 'Empecemos con lo esencial',
  description:
    'Guardamos tu progreso automáticamente desde este primer paso — si necesitas continuar más tarde, ya tendremos cómo retomar la conversación contigo.',
  fields: [
    { id: 'name', type: 'text', label: 'Nombre', required: true, placeholder: 'Tu nombre completo' },
    { id: 'email', type: 'email', label: 'Correo electrónico', required: true, placeholder: 'tucorreo@empresa.com' },
    { id: 'phone', type: 'tel', label: 'Teléfono / WhatsApp', required: true, placeholder: '+593 9…' },
    { id: 'company', type: 'text', label: 'Empresa o proyecto', placeholder: 'Opcional' },
  ],
};

export const QUALIFICATION_STEPS: ProjectFormStep[] = [
  {
    id: 'about-business',
    title: 'Sobre tu negocio',
    fields: [
      {
        id: 'businessDescription',
        type: 'textarea',
        label: '¿A qué se dedica tu negocio o proyecto?',
        required: true,
        placeholder: 'Cuéntanos brevemente qué hacen…',
      },
      {
        id: 'hasExistingSite',
        type: 'radio',
        label: '¿Ya tienes una página web o sistema actual?',
        required: true,
        options: [
          { value: 'si', label: 'Sí, ya tengo' },
          { value: 'no', label: 'No, sería nuevo' },
        ],
      },
      {
        id: 'existingSiteUrl',
        type: 'text',
        label: '¿Cuál es la URL actual?',
        placeholder: 'https://…',
        showIf: (a) => a.hasExistingSite === 'si',
      },
    ],
  },
  {
    id: 'project-need',
    title: '¿Qué tienes en mente?',
    fields: [
      {
        id: 'projectTypes',
        type: 'checkbox',
        label: '¿Qué tipo de proyecto tienes en mente?',
        helperText: 'Puedes elegir más de una opción.',
        required: true,
        options: [
          { value: 'web', label: 'Página web' },
          { value: 'ecommerce', label: 'Tienda en línea / E-commerce' },
          { value: 'app', label: 'App móvil' },
          { value: 'software', label: 'Software a medida' },
          { value: 'redesign', label: 'Rediseño de un sitio existente' },
          { value: 'other', label: 'Otro' },
        ],
      },
      {
        id: 'mainGoal',
        type: 'radio',
        label: '¿Cuál es el objetivo principal?',
        required: true,
        options: [
          { value: 'vender', label: 'Vender en línea' },
          { value: 'leads', label: 'Generar clientes o leads' },
          { value: 'marca', label: 'Presencia de marca' },
          { value: 'automatizar', label: 'Automatizar un proceso interno' },
          { value: 'otro', label: 'Otro' },
        ],
      },
    ],
  },
  {
    id: 'scope',
    title: 'Cuéntanos el alcance',
    fields: [
      {
        id: 'productCount',
        type: 'select',
        label: '¿Cuántos productos aproximadamente?',
        showIf: (a) => Array.isArray(a.projectTypes) && a.projectTypes.includes('ecommerce'),
        options: [
          { value: '1-20', label: '1 – 20' },
          { value: '21-100', label: '21 – 100' },
          { value: '100+', label: 'Más de 100' },
          { value: 'no-se', label: 'Todavía no lo sé' },
        ],
      },
      {
        id: 'paymentGateway',
        type: 'radio',
        label: '¿Necesitas una pasarela de pagos (ej. Datafast)?',
        showIf: (a) => Array.isArray(a.projectTypes) && a.projectTypes.includes('ecommerce'),
        options: [
          { value: 'si', label: 'Sí' },
          { value: 'no', label: 'No' },
          { value: 'no-se', label: 'No estoy seguro/a' },
        ],
      },
      {
        id: 'integrations',
        type: 'checkbox',
        label: '¿Necesitas integrar algo que ya usas?',
        helperText: 'Facturación, inventario, CRM, WhatsApp Business, etc. Opcional.',
        options: [
          { value: 'facturacion', label: 'Facturación electrónica' },
          { value: 'inventario', label: 'Inventario' },
          { value: 'crm', label: 'CRM' },
          { value: 'whatsapp', label: 'WhatsApp Business' },
          { value: 'ninguna', label: 'Ninguna por ahora' },
          { value: 'otro', label: 'Otro' },
        ],
      },
      {
        id: 'platforms',
        type: 'checkbox',
        label: '¿En qué plataformas debe funcionar?',
        required: true,
        options: [
          { value: 'web', label: 'Sitio web' },
          { value: 'ios', label: 'iOS' },
          { value: 'android', label: 'Android' },
          { value: 'no-se', label: 'Todavía no lo sé' },
        ],
      },
    ],
  },
  {
    id: 'timing-budget',
    title: 'Tiempos y presupuesto',
    fields: [
      {
        id: 'timeline',
        type: 'radio',
        label: '¿Para cuándo te gustaría tenerlo listo?',
        required: true,
        options: [
          { value: 'urgente', label: 'Lo antes posible' },
          { value: '1-2m', label: 'En 1 – 2 meses' },
          { value: '3-6m', label: 'En 3 – 6 meses' },
          { value: 'explorando', label: 'Todavía explorando opciones' },
        ],
      },
      {
        id: 'budgetRange',
        type: 'radio',
        label: '¿Tienes un rango de presupuesto estimado?',
        required: true,
        options: [
          { value: '<500', label: 'Menos de $500' },
          { value: '500-1500', label: '$500 – $1,500' },
          { value: '1500-5000', label: '$1,500 – $5,000' },
          { value: '5000+', label: 'Más de $5,000' },
          { value: 'hablarlo', label: 'Prefiero conversarlo por teléfono' },
        ],
      },
      {
        id: 'hasDomainHosting',
        type: 'radio',
        label: '¿Ya cuentas con dominio y hosting?',
        required: true,
        options: [
          { value: 'si', label: 'Sí' },
          { value: 'no', label: 'No, partiría desde cero' },
          { value: 'no-se', label: 'No estoy seguro/a' },
        ],
      },
    ],
  },
  {
    id: 'decision',
    title: 'Sobre la decisión',
    fields: [
      {
        id: 'decisionMaker',
        type: 'radio',
        label: '¿Tomas la decisión tú solo/a o hay más personas involucradas?',
        required: true,
        options: [
          { value: 'solo', label: 'Decido yo solo/a' },
          { value: 'equipo', label: 'Hay más personas involucradas' },
        ],
      },
      {
        id: 'priorExperience',
        type: 'radio',
        label: '¿Has trabajado antes con una agencia o desarrollador?',
        required: true,
        options: [
          { value: 'si', label: 'Sí, ya tengo experiencia con esto' },
          { value: 'no', label: 'No, sería la primera vez' },
        ],
      },
    ],
  },
  {
    id: 'references',
    title: 'Referencias y contexto',
    fields: [
      {
        id: 'designReferences',
        type: 'textarea',
        label: '¿Tienes ejemplos de sitios o apps que te gusten?',
        placeholder: 'Opcional — enlaces o nombres',
      },
      {
        id: 'additionalNotes',
        type: 'textarea',
        label: '¿Algo más que debamos saber sobre tu proyecto?',
        placeholder: 'Opcional',
      },
    ],
  },
  {
    id: 'closing',
    title: '¿Cómo te contactamos?',
    fields: [
      {
        id: 'preferredContactMethod',
        type: 'radio',
        label: '¿Cuál es la mejor forma de contactarte?',
        required: true,
        options: [
          { value: 'whatsapp', label: 'WhatsApp' },
          { value: 'llamada', label: 'Llamada telefónica' },
          { value: 'correo', label: 'Correo electrónico' },
        ],
      },
      {
        id: 'preferredTime',
        type: 'radio',
        label: '¿Qué horario te queda mejor?',
        required: true,
        options: [
          { value: 'manana', label: 'Mañana' },
          { value: 'tarde', label: 'Tarde' },
          { value: 'noche', label: 'Noche' },
          { value: 'cualquiera', label: 'Cualquier horario' },
        ],
      },
    ],
  },
];

export const ALL_STEPS: ProjectFormStep[] = [CONTACT_STEP, ...QUALIFICATION_STEPS];
export const TOTAL_STEPS = ALL_STEPS.length;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function visibleFields(step: ProjectFormStep, answers: LeadAnswers): ProjectFormField[] {
  return step.fields.filter((field) => !field.showIf || field.showIf(answers));
}

export function validateStep(step: ProjectFormStep, answers: LeadAnswers): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const field of visibleFields(step, answers)) {
    if (!field.required) continue;
    const value = answers[field.id];
    if (field.type === 'checkbox') {
      if (!Array.isArray(value) || value.length === 0) {
        errors[field.id] = 'Selecciona al menos una opción.';
      }
      continue;
    }
    if (typeof value !== 'string' || value.trim() === '') {
      errors[field.id] = 'Este campo es obligatorio.';
      continue;
    }
    if (field.type === 'email' && !EMAIL_RE.test(value.trim())) {
      errors[field.id] = 'Ingresa un correo válido.';
    }
  }
  return errors;
}

/** Only the answers that belong to this step's currently-visible fields — what gets autosaved. */
export function buildStepPatch(step: ProjectFormStep, answers: LeadAnswers): LeadAnswers {
  const patch: LeadAnswers = {};
  for (const field of visibleFields(step, answers)) {
    const value = answers[field.id];
    if (value === undefined) continue;
    if (typeof value === 'string' && value.trim() === '') continue;
    if (Array.isArray(value) && value.length === 0) continue;
    patch[field.id] = value as LeadAnswerValue;
  }
  return patch;
}
