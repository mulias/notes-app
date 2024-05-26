"use client";

import { NoteObj } from "@/entity/Note";

interface Props {
  notes: NoteObj[];
}

const NotesList = ({ notes }: Props) => (
  <ul className="flex flex-col gap-4">
    {notes.map((note) => (
      <li key={`${note.id}`}>{note.body}</li>
    ))}
  </ul>
);

export default NotesList;
