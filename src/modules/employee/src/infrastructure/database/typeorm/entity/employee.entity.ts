import {
  Entity,
  Column,
  PrimaryColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";
import { EmployeePostEnum } from "domain/employee";

@Entity({ name: "employee" })
export class EmployeeEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column("uuid")
  restaurant_id!: string;

  @Column({ type: "enum", enum: EmployeePostEnum })
  post!: EmployeePostEnum;

  @Column("varchar", { length: 30 })
  firstname!: string;

  @Column("varchar", { length: 30 })
  lastname!: string;

  @Column("date")
  birthdate!: string;

  @Column("varchar", { length: 70 })
  email!: string;

  @Column("varchar", { length: 20 })
  phone!: string;

  @Column({ type: "boolean" })
  is_deleted!: boolean;

  // @Column("timestamptz")
  @CreateDateColumn({ type: "timestamptz" })
  created!: Date;

  // @Column("timestamptz")
  @UpdateDateColumn({ type: "timestamptz" })
  updated!: Date;
}
