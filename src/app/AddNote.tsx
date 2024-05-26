"use client";

import { useState } from "react";
import type { NoteObj } from "@/entity/Note";
import NoteForm from "@/app/NoteForm";

interface Props {
  setNotes: (notes: NoteObj[]) => void;
}

const AddNote = ({ setNotes }: Props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {open ? (
        <NoteForm setNotes={setNotes} handleClose={handleClose} />
      ) : (
        <button onClick={handleOpen}>Add Note</button>
      )}
    </div>
  );
};

export default AddNote;
