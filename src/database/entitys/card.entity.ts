import { Entity, Column } from "typeorm";
import { MainEntity } from "./main";

@Entity({ name: "card" })
export class CardEntity extends MainEntity {
  constructor() {
    super();
  }

  @Column({ nullable: false, type: "character varying" })
  name?: string;

  @Column({ nullable: false, unique: true, type: "character varying" })
  number?: string;

  @Column({ nullable: false, type: "character varying" })
  holderName?: string;

  @Column({ nullable: false, type: "character varying" })
  flag?: string;

  @Column({ nullable: true, type: "double precision" })
  balance?: number;

  @Column({ nullable: true, type: "character varying" })
  backgroundColor?: string;
}
