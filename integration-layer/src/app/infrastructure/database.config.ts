import { DataSource } from "typeorm";
import { Log } from "./entity/log";

export const ILDataSource = new DataSource({
  type: "postgres",
  host: "10.32.0.18",
  port: 8435,
  username: "stroka01",
  password: "user",
  database: "il_db",
  migrations: ["src/app/infrastructure/migrations/*.ts"],
  entities: [Log],
});
