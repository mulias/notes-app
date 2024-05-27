"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useDebounce } from "use-debounce";
import { listNotes, searchNotes } from "@/app/actions";
import type { NoteObj } from "@/entity/Note";
import { castNumber } from "@/lib/env";

const QUERY_DEBOUNCE_MILLISECONDS =
  castNumber(process.env.NOTES_SEARCH_DEBOUNCE_MILLISECONDS) ?? 300;

interface Props {
  setNotes: (notes: NoteObj[]) => void;
}

const NotesFilter = ({ setNotes }: Props) => {
  const [didMount, setDidMount] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, QUERY_DEBOUNCE_MILLISECONDS);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

  useEffect(() => {
    const search = async () => {
      if (query == "") {
        setNotes(await listNotes());
      } else {
        setNotes(await searchNotes(query));
      }
    };

    // Skip the initial mount, only search when the query is changed.
    if (didMount) {
      search();
    } else {
      setDidMount(true);
    }
  }, [debouncedQuery]);

  return <input type="text" onChange={handleChange} />;
};

export default NotesFilter;
