"use client";

import { useState, useTransition, MouseEvent } from "react";
import { listNotes, deleteNote } from "@/app/actions";
import { NoteObj } from "@/entity/Note";
import NoteForm from "@/app/NoteForm";
import StickyNoteBase from "@/app/StickyNoteBase";
import TextButton from "@/components/TextButton";

interface Props {
  note: NoteObj;
  setNotes: (notes: NoteObj[]) => void;
}

const Note = ({ note, setNotes }: Props) => {
  const [edit, setEdit] = useState(false);
  const handleOpenForm = () => setEdit(true);
  const handleCloseForm = () => setEdit(false);

  const [isPending, startTransition] = useTransition();

  const deleteAction = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    startTransition(async () => {
      await deleteNote(note.id);
      const notes = await listNotes();
      setNotes(notes);
    });
  };

  return (
    <StickyNoteBase
      colorSeed={note.createdAt.getTime()}
      className={`group hover:drop-shadow-2xl cursor-pointer ${edit && "drop-shadow-2xl scale-105"}`}
      onClick={edit ? undefined : handleOpenForm}
    >
      {edit ? (
        <NoteForm
          note={note}
          setNotes={setNotes}
          handleClose={handleCloseForm}
        />
      ) : (
        <div className="flex flex-col h-full">
          <p className="mb-auto break-words p-6">{note.body}</p>
          <div className="flex justify-end gap-2 pb-4 px-6">
            <TextButton
              onClick={handleOpenForm}
              disabled={isPending}
              className="group-hover:underline-offset-4"
            >
              Edit
            </TextButton>
            <TextButton onClick={deleteAction} disabled={isPending}>
              {isPending ? "Deleting" : "Delete"}
            </TextButton>
          </div>
        </div>
      )}
    </StickyNoteBase>
  );
};

export default Note;
