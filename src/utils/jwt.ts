import { JwtPayloadSchema, type JwtPayload } from '@api/schemas/user.schema';

/** Decodifica (sin verificar firma) el payload de un JWT y valida su forma. */
export function decodeJwt(token: string): JwtPayload {
  const [, payload] = token.split('.');
  if (!payload) {
    throw new Error('JWT inválido: falta el payload');
  }
  const json = Buffer.from(payload, 'base64url').toString('utf8');
  return JwtPayloadSchema.parse(JSON.parse(json));
}
