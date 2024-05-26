"use server";

import type { Result } from "@/lib/result";
import { Repository } from "typeorm";
import { getAppDataSource } from "@/data-source";
import { Note, NoteBuilder, NoteObj } from "@/entity/Note";

export const listNotes = async (): Promise<NoteObj[]> => {
  const notesRepo = await getNotesRepo();
  const notes = await notesRepo.find();
  return notes.map((note) => note.toObj());
};

export const deleteNote = async (id: number) => {
  const notesRepo = await getNotesRepo();
  await notesRepo.delete(id);
};

export const persistNote = async (
  id: number | undefined,
  formData: FormData,
): Promise<Result> => {
  const notesRepo = await getNotesRepo();

  const note =
    id === undefined
      ? Note.newBuilder()
      : await notesRepo.findOneByOrFail({ id });

  const fields = noteFields(formData);

  if (fields.ok) {
    note.body = fields.body;
  } else {
    return fields;
  }

  const validated = validateNote(note);

  if (validated.ok) {
    await notesRepo.save(note);
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

/**
 * Search the text body of all notes for matching words using Postgres full
 * text search. This will not match substrings in words. Return all notes with
 * a match.
 */
export const searchNotes = async (query: string) => {
  const notesRepo = await getNotesRepo();

  const notes = await notesRepo
    .createQueryBuilder("note")
    .where(`to_tsvector(note.body) @@ phraseto_tsquery('english', :query)`, {
      query,
    })
    .getMany();

  return notes.map((note) => note.toObj());
};

const getNotesRepo = async (): Promise<Repository<Note>> => {
  const AppDataSource = await getAppDataSource();
  return AppDataSource.getRepository(Note);
};
