import {
  createConnection as createConnectionTypeORM,
  ConnectionOptions,
  Connection,
} from "typeorm";
import { config } from "dotenv";
import { resolve } from "path";
import { CardEntity } from "./entitys/card.entity";
import { UserEntity } from "./entitys/user.entity";

class ConnectionFactory {
  async createConnection() {
    config();
    const {
      HOST,
      USERDATABASE,
      PASSWORD,
      DATABASE,
      PORT_DATABASE,
      MODE,
    } = process.env;
    try {
      await createConnectionTypeORM({
        type: "postgres",
        host: HOST,
        username: USERDATABASE,
        password: PASSWORD,
        database: DATABASE,
        port: Number(PORT_DATABASE),
        synchronize: MODE === "dev" ? true : false,
        migrationsRun: MODE === "dev" ? true : false,
        entities: [UserEntity, CardEntity],
      });
    } catch (error) {
      console.log("not Connected database - " + error);
      throw "Not connected database";
    }
  }
}

export default new ConnectionFactory().createConnection;
