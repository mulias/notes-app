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
      <div className="flex flex-col md:flex-row gap-10 w-full justify-start">
        <h1 className="text-5xl">Sticky</h1>
        <NotesFilter setNotes={setNotes} />
      </div>
      <NotesList notes={notes} setNotes={setNotes} />
    </>
  );
};

export default NotesWorkspace;
