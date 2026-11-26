import { z } from "zod";

const JWT_REGEX = /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/;

export const AuthUserSchema = z
  .object({
    id: z.number().int().positive(),
    username: z.string().min(1),
    name: z.string().min(1),
    role: z.string().min(1),
  })
  .strict();

export const LoginResponseSchema = z
  .object({
    token: z.string().regex(JWT_REGEX, "Invalid JWT format"),
    expiresIn: z.number().int().positive(),
    user: AuthUserSchema,
    requestId: z.string().regex(/^req_[a-f0-9]{12}$/),
  })
  .strict();

export const JwtPayloadSchema = z.object({
  sub: z.string(),
  iat: z.number().int(),
  exp: z.number().int(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type JwtPayload = z.infer<typeof JwtPayloadSchema>;
