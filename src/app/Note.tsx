"use client";

import { useState, useTransition } from "react";
import { listNotes, deleteNote } from "@/app/actions";
import { NoteObj } from "@/entity/Note";
import NoteForm from "@/app/NoteForm";
import StickyNoteBase from "@/app/StickyNoteBase";

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

  return (
    <StickyNoteBase colorSeed={note.createdAt.getTime()}>
      {edit ? (
        <NoteForm
          note={note}
          setNotes={setNotes}
          handleClose={handleCloseForm}
        />
      ) : (
        <div className="flex flex-col h-full">
          <p className="mb-auto break-words">{note.body}</p>
          <div className="flex justify-end gap-2">
            <button onClick={handleOpenForm} disabled={isPending}>
              Edit
            </button>
            <button onClick={deleteAction} disabled={isPending}>
              {isPending ? "Deleting" : "Delete"}
            </button>
          </div>
        </div>
      )}
    </StickyNoteBase>
  );
};

export default Note;
