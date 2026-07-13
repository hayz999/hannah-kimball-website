import { requireAdmin } from '@/lib/requireAdmin';
import db from '@/lib/db';

type Params = Promise<{ id: string }>;

export async function PUT(request: Request, { params }: { params: Params }) {
  if (!await requireAdmin()) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await request.json();

  await db.execute({
    sql: 'UPDATE gigs SET choir_name=?, start_date=?, end_date=?, summary=?, video_url=? WHERE id=?',
    args: [
      body.choir_name ?? '',
      body.start_date ?? '',
      body.end_date ?? '',
      body.summary ?? null,
      body.video_url ?? null,
      id,
    ],
  });

  return Response.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: { params: Params }) {
  if (!await requireAdmin()) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  await db.execute({ sql: 'DELETE FROM gigs WHERE id=?', args: [id] });
  
  return Response.json({ ok: true });
}
