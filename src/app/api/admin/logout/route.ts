import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import type { AdminSession} from '@/lib/session';
import { sessionOptions } from '@/lib/session';

export async function POST() {
  const cookieStore = await cookies();
  const session = await getIronSession<AdminSession>(cookieStore, sessionOptions);

  session.destroy();
  
  return Response.json({ ok: true });
}
