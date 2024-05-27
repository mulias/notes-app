"use client";

import { NoteObj } from "@/entity/Note";
import Note from "@/app/Note";
import AddNote from "@/app/AddNote";

interface Props {
  notes: NoteObj[];
  setNotes: (notes: NoteObj[]) => void;
}

const NotesList = ({ notes, setNotes }: Props) => (
  <ul className="flex flex-row flex-wrap gap-8">
    <li>
      <AddNote setNotes={setNotes} />
    </li>
    {notes.map((note) => (
      <li key={`${note.id}`}>
        <Note note={note} setNotes={setNotes} />
      </li>
    ))}
  </ul>
);

export default NotesList;
