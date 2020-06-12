import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "user" })
export class UserEntity {
  @PrimaryGeneratedColumn({ type: "uuid", })
  id?: number;

  @Column({ nullable: false, type: "character varying" })
  email?: string;

  @Column({ nullable: false, type: "character varying" })
  password?: string;
}
