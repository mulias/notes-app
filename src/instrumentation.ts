import { AppDataSource } from "@/data-source";
import { Note } from "@/entity/Note";

export async function register() {
  await AppDataSource.initialize().then(async () => {
    const note1 = new Note();
    note1.body = "Hello Marginalia!";
    await AppDataSource.manager.save(note1);

    const note2 = new Note();
    note2.body = "TODO: write more notes";
    await AppDataSource.manager.save(note2);
  });
}
