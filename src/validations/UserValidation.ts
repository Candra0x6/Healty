import { z } from "zod";

export const UserValidation = z.object({
  name: z.coerce.number().min(1).max(3),
});
