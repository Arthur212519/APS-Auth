import { z } from 'zod';

export const registerSchema = z.object({
    username: z
        .string()
        .min(3, 'username muito pequeno')
        .max(20, 'username muito longo'),

    email: z
        .string()
        .email('email inválido'),

    password: z
        .string()
        .min(6, 'senha deve ter no minimo 6 caracteres'),
});

export const loginSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(6), 
});