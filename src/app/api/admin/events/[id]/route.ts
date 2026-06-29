import { requireAdmin } from '@/lib/requireAdmin';
import db from '@/lib/db';

type Params = Promise<{ id: string }>;

export async function PUT(request: Request, { params }: { params: Params }) {
  if (!await requireAdmin()) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const body = await request.json();
  await db.execute({
    sql: 'UPDATE events SET title=?, description=?, start_date=?, end_date=?, location=?, event_details_url=? WHERE id=?',
    args: [
      body.title ?? '',
      body.description ?? null,
      body.start_date ?? '',
      body.end_date ?? '',
      body.location ?? null,
      body.event_details_url ?? null,
      id,
    ],
  });
  return Response.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: { params: Params }) {
  if (!await requireAdmin()) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  await db.execute({ sql: 'DELETE FROM events WHERE id=?', args: [id] });
  return Response.json({ ok: true });
}
