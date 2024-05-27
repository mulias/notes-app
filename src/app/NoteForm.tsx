"use client";

import { useState, useTransition } from "react";
import { listNotes, persistNote } from "@/app/actions";
import type { NoteObj } from "@/entity/Note";

interface Props {
  note?: NoteObj;
  setNotes: (notes: NoteObj[]) => void;
  handleClose: () => void;
}

const NoteForm = ({ note, setNotes, handleClose }: Props) => {
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const submitAction = async (formData: FormData) => {
    startTransition(async () => {
      const result = await persistNote(note?.id, formData);
      if (result.ok) {
        const notes = await listNotes();
        setNotes(notes);
        handleClose();
      } else {
        setError(result.message);
      }
    });
  };

  return (
    <form action={submitAction} className="h-full flex flex-col">
      <textarea
        name="body"
        defaultValue={note?.body}
        className="w-full h-full bg-transparent resize-none"
      />
      {error && <p>{error}</p>}
      <div className="flex justify-end gap-2">
        <button onClick={handleClose}>Cancel</button>
        <button type="submit" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
