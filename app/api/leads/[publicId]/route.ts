import { eq, sql, type SQL } from 'drizzle-orm';
import { getDb } from '@/db';
import { leads } from '@/db/schema';
import { DEDICATED_ANSWER_KEYS, toColumnValue, type LeadAnswers } from '@/lib/leads';

function toRouteErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : 'Unexpected error';
  const detail = error instanceof Error && error.cause instanceof Error ? error.cause.message : '';
  const combined = `${message}\n${detail}`;

  if (combined.includes('no such table') || combined.includes('from "leads"')) {
    return 'La tabla de leads todavía no existe en la base de datos.';
  }

  return message;
}

async function loadLead(publicId: string) {
  const db = getDb();
  const [row] = await db.select().from(leads).where(eq(leads.publicId, publicId)).limit(1);
  return row ?? null;
}

type UpdateLeadBody = {
  step?: number;
  patch?: LeadAnswers;
  completed?: boolean;
};

async function applyUpdate(publicId: string, body: UpdateLeadBody) {
  const existing = await loadLead(publicId);
  if (!existing) return false;

  const currentAnswers = JSON.parse(existing.answersJson || '{}') as Record<string, unknown>;
  const patch = body.patch ?? {};
  const mergedAnswers = { ...currentAnswers, ...patch };

  const update: Partial<Omit<typeof leads.$inferInsert, 'updatedAt'>> & { updatedAt: SQL<unknown> } = {
    answersJson: JSON.stringify(mergedAnswers),
    updatedAt: sql`CURRENT_TIMESTAMP`,
  };

  if (typeof body.step === 'number' && Number.isFinite(body.step)) {
    update.currentStep = Math.max(0, Math.trunc(body.step));
  }
  if (body.completed) {
    update.status = 'completed';
  }

  for (const key of DEDICATED_ANSWER_KEYS) {
    const value = toColumnValue(patch[key]);
    if (value !== undefined) {
      update[key] = value;
    }
  }

  const db = getDb();
  await db.update(leads).set(update).where(eq(leads.publicId, publicId));
  return true;
}

// The wizard resumes a visitor's progress (same device/browser, localStorage
// still has their token) by fetching whatever was already saved.
export async function GET(_request: Request, { params }: { params: Promise<{ publicId: string }> }) {
  try {
    const { publicId } = await params;
    const row = await loadLead(publicId);
    if (!row) {
      return Response.json({ error: 'not_found' }, { status: 404 });
    }
    return Response.json({
      publicId: row.publicId,
      status: row.status,
      currentStep: row.currentStep,
      answers: JSON.parse(row.answersJson || '{}'),
    });
  } catch (error) {
    return Response.json({ error: toRouteErrorMessage(error) }, { status: 500 });
  }
}

async function handleUpdate(request: Request, { params }: { params: Promise<{ publicId: string }> }) {
  try {
    const { publicId } = await params;
    const body = (await request.json().catch(() => ({}))) as UpdateLeadBody;
    const ok = await applyUpdate(publicId, body);
    if (!ok) {
      return Response.json({ error: 'not_found' }, { status: 404 });
    }
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: toRouteErrorMessage(error) }, { status: 500 });
  }
}

// Every step transition autosaves via PATCH.
export const PATCH = handleUpdate;
// `navigator.sendBeacon` (used as a best-effort flush when the tab closes
// mid-step) can only issue POST requests — same semantics as PATCH.
export const POST = handleUpdate;
