import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import type { AdminSession} from './session';
import { sessionOptions } from './session';

export async function requireAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = await getIronSession<AdminSession>(cookieStore, sessionOptions);
  
  return session.isLoggedIn === true;
}
