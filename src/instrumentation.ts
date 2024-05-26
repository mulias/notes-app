import { AppDataSource } from "@/data-source";
import { Note } from "@/entity/Note";

export function register() {
  AppDataSource.initialize();
}
