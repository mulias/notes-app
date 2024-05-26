"use client";

import { useState, useEffect } from "react";
import type { NoteObj } from "@/entity/Note";
import NotesList from "@/app/NotesList";
import AddNote from "@/app/AddNote";

interface Props {
  initialNotes: NoteObj[];
}

const NotesWorkspace = ({ initialNotes }: Props) => {
  const [notes, setNotes] = useState(initialNotes);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="space-y-8">
        <NotesList notes={notes} />
        <AddNote setNotes={setNotes} />
      </div>
    </main>
  );
};

export default NotesWorkspace;
