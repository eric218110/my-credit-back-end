import { Entity, Column } from "typeorm";
import { MainEntity } from "./main";

@Entity({ name: "user" })
export class UserEntity extends MainEntity {
  constructor() {
    super();
  }
  @Column({ nullable: false, type: "character varying" })
  email?: string;

  @Column({ nullable: false, type: "character varying" })
  password?: string;
}
