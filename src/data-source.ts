import "reflect-metadata";
import { DataSource } from "typeorm";
import { Note } from "@/entity/Note";
import { castNumber } from "@/lib/env";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DB_URL,
  host: process.env.DB_HOST,
  port: castNumber(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: process.env.DB_SYNCHRONIZE == "true",
  logging: process.env.DB_LOGGING == "true",
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
