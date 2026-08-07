import type { SessionOptions } from 'iron-session';

export type AdminSession = {
  isLoggedIn: boolean;
  username: string;
};

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error('SESSION_SECRET environment variable must be set');
}

export const sessionOptions: SessionOptions = {
  password: sessionSecret,
  cookieName: 'hannah_admin_session',
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 8,
  },
};
