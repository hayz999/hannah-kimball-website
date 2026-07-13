import type { SessionOptions } from 'iron-session';

export type AdminSession = {
  isLoggedIn: boolean;
  username: string;
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET ?? 'dev-secret-replace-in-production-32ch',
  cookieName: 'hannah_admin_session',
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 8,
  },
};
