import { getAppDataSource } from "@/data-source";
import NotesWorkspace from "@/app/NotesWorkspace";
import { listNotes } from "@/app/actions";

const Home = async () => {
  const notes = await listNotes();

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24">
      <NotesWorkspace initialNotes={notes} />
    </main>
  );
};

export default Home;
