import { z } from "zod";

export const SchemaContent = z.object({
  title: z
    .string()
    .min(1, { message: "Title must be at least 1 character long" }),
  autor: z
    .string()
    .min(1, { message: "Autor name must be at least 1 character long" }),
  description: z
    .string()
    .min(1, { message: "Description must be at least 1 character long" })
    .max(500, { message: "Description must be at most 500 characters long" }),
  link: z.string().url(),
  media_type: z.enum(["livro", "artigo", "podcast", "video"]),
  tags: z.array(
    z.number().int().positive().min(1, { message: "Tag id must be positive" }),
  ),
});
