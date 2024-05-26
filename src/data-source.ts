import "reflect-metadata";
import { DataSource } from "typeorm";
import { Note } from "./entity/Note";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "elias",
  password: "",
  database: "marginalia",
  synchronize: true,
  logging: false,
  entities: [Note],
  migrations: [],
  subscribers: [],
});

export const getAppDataSource = async (): Promise<DataSource> => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
};
