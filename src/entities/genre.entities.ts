import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cartoon } from "./cartoon.entities";
@Entity()
export class Genre extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name?: string;

  @ManyToOne(() => Cartoon, (cartoon:Cartoon) => cartoon.genres)
  cartoon: Cartoon;
}