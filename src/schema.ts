import { z, ZodNull, ZodSchema } from 'zod';

export function jsonToZodSchema(json: any): ZodSchema<any> {
  if (json === null) return z.null();
  if (typeof json === 'string') return z.string();
  if (typeof json === 'number') return z.number();
  if (typeof json === 'boolean') return z.boolean();
  if (Array.isArray(json)) return z.array(jsonToZodSchema(json[0]));
  if (typeof json === 'object' && json !== null) {
    const shape: Record<string, ZodSchema<any>> = {};
    for (const key in json) {
      shape[key] = jsonToZodSchema(json[key]);
    }
    return z.object(shape);
  }
  return z.any(); // Fallback for unexpected cases
}
