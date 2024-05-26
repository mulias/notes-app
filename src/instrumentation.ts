import { AppDataSource } from "@/data-source";

export async function register() {
  await AppDataSource.initialize();
}
