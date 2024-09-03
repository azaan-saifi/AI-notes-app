import { z } from "zod";
export const notesSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().optional(),
});

export type NotesSchema = z.infer<typeof notesSchema>;

export const updateSchema = notesSchema.extend({
  id: z.string().min(1),
});

export const deleteSchema = z.object({
  id: z.string().min(1),
});
