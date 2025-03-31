import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cartoon } from "./cartoon.entities";
@Entity()
export class Personnage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  short_description: string;

  @Column()
  role: string;

  @ManyToOne(() => Cartoon, (cartoon: Cartoon) => cartoon.personnages)
  cartoon: Cartoon;
}
