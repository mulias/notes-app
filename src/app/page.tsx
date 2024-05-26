import Image from "next/image";
import { getAppDataSource } from "@/data-source";
import { Note } from "@/entity/Note";

const Home = async () => {
  const AppDataSource = await getAppDataSource();
  const noteRepo = AppDataSource.getRepository(Note);

  const notes = await noteRepo.find();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ul>
        {notes.map((note) => (
          <li key={`${note.id}`}>{note.body}</li>
        ))}
      </ul>
    </main>
  );
};

export default Home;
