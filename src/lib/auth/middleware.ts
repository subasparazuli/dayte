import { getSession } from './session';
import { Errors } from '@/lib/errors';
import { Role } from './types';

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    throw Errors.unauthorized();
  }
  return session;
}

export async function requireRole(allowedRoles: Role[]) {
  const session = await requireAuth();
  if (!allowedRoles.includes(session.user.role)) {
    throw Errors.forbidden();
  }
  return session;
}

export async function requireOwnership(ownerId: string) {
  const session = await requireAuth();
  if (session.user.id !== ownerId && session.user.role !== Role.ADMIN) {
    throw Errors.forbidden('You do not have permission to access this resource');
  }
  return session;
}
