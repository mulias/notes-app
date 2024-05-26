"use client";

import { useState, useEffect } from "react";
import type { NoteObj } from "@/entity/Note";
import NotesFilter from "@/app/NotesFilter";
import NotesList from "@/app/NotesList";
import AddNote from "@/app/AddNote";

interface Props {
  initialNotes: NoteObj[];
}

const NotesWorkspace = ({ initialNotes }: Props) => {
  const [notes, setNotes] = useState(initialNotes);

  return (
    <>
      <NotesFilter setNotes={setNotes} />
      <div className="space-y-8">
        <NotesList notes={notes} setNotes={setNotes} />
        <AddNote setNotes={setNotes} />
      </div>
    </>
  );
};

export default NotesWorkspace;
