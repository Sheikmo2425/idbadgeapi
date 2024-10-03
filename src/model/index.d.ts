import { Session, SessionData } from 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId?: string;
    employeeId?: string;
  }
}

declare module 'express' {
  interface Request {
    session: Session & Partial<SessionData>;
  }
}
