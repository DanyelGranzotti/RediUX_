import { z } from "zod";

export const SchemaTag = z.object({
  name: z
    .string()
    .min(1, { message: "Tag name must be at least 1 character long" }),
});
