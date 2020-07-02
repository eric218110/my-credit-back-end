import { Entity, Column, OneToMany } from "typeorm";
import { MainEntity } from "./main";
import { CardEntity } from "./card.entity";

@Entity({ name: "user" })
export class UserEntity extends MainEntity {
  constructor() {
    super();
  }
  @Column({ nullable: false, type: "character varying" })
  uid!: string;

  @Column({ nullable: false, type: "character varying" })
  name!: string;

  @Column({ nullable: false, type: "character varying", unique: true })
  email!: string;

  @Column({ nullable: false, type: "character varying" })
  password!: string;

  @Column({ nullable: true, type: "character varying" })
  photoURL!: string;

  @Column({ nullable: false, type: "character varying" })
  token!: string;

  @OneToMany((type) => CardEntity, (cardEntity: CardEntity) => cardEntity.user)
  cards!: CardEntity[];
}
