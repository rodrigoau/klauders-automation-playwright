import { test, expect } from '@fixtures/api.fixtures';
import { LoginResponseSchema } from '@api/schemas/user.schema';
import { decodeJwt } from '@utils/jwt';

const USERNAME = process.env.API_USER ?? 'qa.engineer';
const PASSWORD = process.env.API_PASSWORD ?? 'Klauders#2026';

test.describe('Auth API - Login', () => {
  test.beforeAll(() => {
    if (!PASSWORD) {
      throw new Error('Falta API_PASSWORD en el archivo .env');
    }
  });

  test('login válido regresa token y usuario con el contrato correcto', async ({ authApi }) => {
    const response = await authApi.login(USERNAME, PASSWORD!);
    expect(response.status()).toBe(200);

    // Contrato del response
    const body = LoginResponseSchema.parse(await response.json());
    expect(body.user.username).toBe(USERNAME);

    // Consistencia del JWT con el body
    const jwt = decodeJwt(body.token);
    expect(jwt.sub).toBe(body.user.username);
    expect(jwt.exp - jwt.iat).toBe(body.expiresIn);
    expect(jwt.exp * 1000).toBeGreaterThan(Date.now());
  });

  test('password incorrecto regresa 401 sin token', async ({ authApi }) => {
    const response = await authApi.login(USERNAME, 'password-incorrecto');
    expect(response.status()).toBe(401);

    const body = await response.json();
    expect(body).not.toHaveProperty('token');
  });

  test('usuario inexistente regresa 401 sin token', async ({ authApi }) => {
    const response = await authApi.login(`no.existe.${Date.now()}`, PASSWORD!);
    expect(response.status()).toBe(401);

    const body = await response.json();
    expect(body).not.toHaveProperty('token');
  });

  test('campos vacíos regresan 400', async ({ authApi }) => {
    const response = await authApi.login('', '');
    expect(response.status()).toBe(400);
  });
});