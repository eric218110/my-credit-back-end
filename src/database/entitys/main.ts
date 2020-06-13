/**
 *
 * @author Eric Silva
 * @export MainEntity
 * @abstract
 * @class MainEntity
 *
 */

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export abstract class MainEntity {
  constructor() {}

  @PrimaryGeneratedColumn("uuid")
  public id?: string;

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  protected createdIn?: string;

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  protected updatedIn?: string;
}
