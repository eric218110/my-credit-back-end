import {
  createConnection as createConnectionTypeORM,
  ConnectionOptions,
  Connection,
} from "typeorm";
import { config } from "dotenv";
import { resolve } from "path";

class ConnectionFactory {
  createConnection() {
    config();
    const { HOST, USER, PASSWORD, DATABASE, PORT_DATABASE, MODE } = process.env;
    try {
      createConnectionTypeORM({
        type: "postgres",
        host: HOST,
        username: USER,
        password: PASSWORD,
        database: DATABASE,
        port: Number(PORT_DATABASE),
        synchronize: MODE === "dev" ? true : false,
        migrationsRun: MODE === "dev" ? true : false,
        entities: [resolve(__dirname, ".", "entitys", "*.entity{.ts,.js}")],
      });
    } catch (error) {
      console.log("not Connected database - " + error);
      throw "Not connected database";
    }
  }
}

export default new ConnectionFactory().createConnection;
