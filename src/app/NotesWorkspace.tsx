"use client";

import { useState, useEffect } from "react";
import type { NoteObj } from "@/entity/Note";
import NotesFilter from "@/app/NotesFilter";
import NotesList from "@/app/NotesList";

interface Props {
  initialNotes: NoteObj[];
}

const NotesWorkspace = ({ initialNotes }: Props) => {
  const [notes, setNotes] = useState(initialNotes);

  return (
    <>
      <NotesFilter setNotes={setNotes} />
      <NotesList notes={notes} setNotes={setNotes} />
    </>
  );
};

export default NotesWorkspace;
