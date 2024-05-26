"use client";

import { NoteObj } from "@/entity/Note";
import Note from "@/app/Note";

interface Props {
  notes: NoteObj[];
  setNotes: (notes: NoteObj[]) => void;
}

const NotesList = ({ notes, setNotes }: Props) => (
  <ul className="flex flex-col gap-4">
    {notes.map((note) => (
      <li key={`${note.id}`}>
        <Note note={note} setNotes={setNotes} />
      </li>
    ))}
  </ul>
);

export default NotesList;
