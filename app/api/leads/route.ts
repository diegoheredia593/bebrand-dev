import { getDb } from '@/db';
import { leads } from '@/db/schema';
import { generatePublicId, isValidEmail } from '@/lib/leads';

function toRouteErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : 'Unexpected error';
  const detail = error instanceof Error && error.cause instanceof Error ? error.cause.message : '';
  const combined = `${message}\n${detail}`;

  if (combined.includes('no such table') || combined.includes('from "leads"')) {
    return 'La tabla de leads todavía no existe en la base de datos.';
  }

  return message;
}

type CreateLeadBody = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  // Honeypot field: real visitors never see or fill it (visually hidden,
  // not `display:none`, so simple bots that skip `display:none` fields
  // still trip it). Never rendered as a real question in the wizard.
  website?: string;
};

// Step 0 of the wizard (contact capture) calls this the moment a visitor
// fills name/email/phone and continues — this is what guarantees a
// follow-up-able contact exists even if the rest of the form is abandoned.
export async function POST(request: Request) {
  try {
    const payload = (await request.json().catch(() => ({}))) as CreateLeadBody;

    if (payload.website && payload.website.trim() !== '') {
      // Looks like a bot: pretend success without writing a row so it
      // learns nothing from the response.
      return Response.json({ publicId: generatePublicId() }, { status: 201 });
    }

    const name = payload.name?.trim() ?? '';
    const email = payload.email?.trim() ?? '';
    const phone = payload.phone?.trim() ?? '';
    const company = payload.company?.trim() ?? '';

    if (!name || !email || !phone) {
      return Response.json({ error: 'Nombre, correo y teléfono son obligatorios.' }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return Response.json({ error: 'El correo no parece válido.' }, { status: 400 });
    }

    const publicId = generatePublicId();
    const answers = { name, email, phone, company };

    const db = getDb();
    await db.insert(leads).values({
      publicId,
      status: 'in_progress',
      currentStep: 1,
      name,
      email,
      phone,
      company,
      answersJson: JSON.stringify(answers),
    });

    return Response.json({ publicId }, { status: 201 });
  } catch (error) {
    return Response.json({ error: toRouteErrorMessage(error) }, { status: 500 });
  }
}
