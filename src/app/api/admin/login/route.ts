import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { createHmac, randomBytes } from 'crypto';
import type { AdminSession} from '@/lib/session';
import { sessionOptions } from '@/lib/session';

function constantTimeEqual(a: string, b: string): boolean {
  const key = randomBytes(32);
  const hmacA = createHmac('sha256', key).update(a).digest();
  const hmacB = createHmac('sha256', key).update(b).digest();

  return hmacA.equals(hmacB);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { username = '', password = '' } = body as Record<string, string>;

  const expectedUsername = process.env.ADMIN_USERNAME ?? '';
  const expectedPassword = process.env.ADMIN_PASSWORD ?? '';

  const usernameOk = constantTimeEqual(username, expectedUsername);
  const passwordOk = constantTimeEqual(password, expectedPassword);

  if (!usernameOk || !passwordOk) {
    return Response.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const cookieStore = await cookies();
  const session = await getIronSession<AdminSession>(cookieStore, sessionOptions);
  
  session.isLoggedIn = true;
  session.username = username;
  await session.save();

  return Response.json({ ok: true });
}
