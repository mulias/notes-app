"use server";

import type { Result } from "@/lib/result";
import { getAppDataSource } from "@/data-source";
import { Note, NoteBuilder, NoteObj } from "@/entity/Note";

export const listNotes = async (): Promise<NoteObj[]> => {
  const AppDataSource = await getAppDataSource();
  const noteRepo = AppDataSource.getRepository(Note);
  const notes = await noteRepo.find();
  return notes.map((note) => note.toObj());
};

export const persistNote = async (
  id: number | undefined,
  formData: FormData,
): Promise<Result> => {
  const AppDataSource = await getAppDataSource();
  const repo = AppDataSource.getRepository(Note);

  const note =
    id === undefined ? Note.newBuilder() : await repo.findOneByOrFail({ id });

  const fields = noteFields(formData);

  if (fields.ok) {
    note.body = fields.body;
  } else {
    return fields;
  }

  const validated = validateNote(note);

  if (validated.ok) {
    await repo.save(note);
    return { ok: true };
  } else {
    return validated;
  }
};

const noteFields = (formData: FormData): Result<{ body: string }> => {
  const body = formData.get("body");
  if (typeof body === "string") {
    return { ok: true, body };
  } else {
    return { ok: false, message: "Note body must be a non-empty string" };
  }
};

/* Validate
 * - body is a string
 * - body length is greater than or equal to 20 characters
 * - body length is less than or equal to 300 characters
 */
const validateNote = (note: NoteBuilder): Result => {
  var message = undefined;

  if (typeof note.body !== "string") {
    message = "Note body must be a non-empty string";
  } else if (note.body.length < 20) {
    message = "Note body must be at least 20 characters long";
  } else if (note.body.length > 300) {
    message = "Note body must be less than 300 characters long";
  }

  if (message) {
    return { ok: false, message };
  } else {
    return { ok: true };
  }
};
