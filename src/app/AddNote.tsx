"use client";

import { useState } from "react";
import type { NoteObj } from "@/entity/Note";
import NoteForm from "@/app/NoteForm";
import StickyNoteBase from "@/app/StickyNoteBase";

interface Props {
  setNotes: (notes: NoteObj[]) => void;
}

const AddNote = ({ setNotes }: Props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <StickyNoteBase colorSeed={0}>
      {open ? (
        <NoteForm setNotes={setNotes} handleClose={handleClose} />
      ) : (
        <div className="flex justify-center items-center h-full">
          <button onClick={handleOpen}>Add Note</button>
        </div>
      )}
    </StickyNoteBase>
  );
};

export default AddNote;
