"use client";

import { useState, useTransition } from "react";
import { listNotes, persistNote } from "@/app/actions";
import type { NoteObj } from "@/entity/Note";
import TextButton from "@/components/TextButton";

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
    <form
      action={submitAction}
      className={`h-full flex flex-col ${error && "outline outline-offset-1 outline-red-500"}`}
    >
      <textarea
        name="body"
        defaultValue={note?.body}
        className="w-full h-full bg-transparent resize-none p-6 outline-none"
        autoFocus
      />
      {error && <p className="px-6 py-2 text-white">Error: {error}</p>}
      <div className="flex justify-end gap-2 pb-4 px-6">
        <TextButton type="button" onClick={handleClose} disabled={isPending}>
          Cancel
        </TextButton>
        <TextButton type="submit" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit"}
        </TextButton>
      </div>
    </form>
  );
};

export default NoteForm;
