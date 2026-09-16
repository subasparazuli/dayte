export enum Role {
  GUEST = 'GUEST',
  HOST = 'HOST',
  ADMIN = 'ADMIN',
}

export interface AuthTokenPayload {
  userId: string;
  role: Role;
  sessionId: string;
  [key: string]: any;
}

export interface UserSession {
  user: {
    id: string;
    role: Role;
    status: string;
    phone?: string | null;
    email?: string | null;
  };
  sessionId: string;
}
