"use client";

import { useState, useTransition } from "react";
import { listNotes, deleteNote } from "@/app/actions";
import { NoteObj } from "@/entity/Note";
import NoteForm from "@/app/NoteForm";

interface Props {
  note: NoteObj;
  setNotes: (notes: NoteObj[]) => void;
}

const Note = ({ note, setNotes }: Props) => {
  const [edit, setEdit] = useState(false);
  const handleOpenForm = () => setEdit(true);
  const handleCloseForm = () => setEdit(false);

  const [isPending, startTransition] = useTransition();

  const deleteAction = async () => {
    startTransition(async () => {
      await deleteNote(note.id);
      const notes = await listNotes();
      setNotes(notes);
    });
  };

  return edit ? (
    <NoteForm note={note} setNotes={setNotes} handleClose={handleCloseForm} />
  ) : (
    <div className="flex gap-4">
      <p className="mr-auto">{note.body}</p>
      <div className="flex gap-2">
        <button onClick={handleOpenForm} disabled={isPending}>
          Edit
        </button>
        <button onClick={deleteAction} disabled={isPending}>
          {isPending ? "Deleting" : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default Note;
