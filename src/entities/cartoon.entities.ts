import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Genre } from "./genre.entities";
import { Personnage } from "./personnages.entities";
@Entity()
export class Cartoon extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  nb_of_episodes: number;

  @Column()
  nb_of_seasons: number;

  @Column()
  realisator: string;

  @Column()
  author: string;

  @Column()
  ft_diffusion: string;

  @OneToMany(() => Genre, (genre) => genre.cartoon, { cascade: true })
  genres?: Genre[];

  @OneToMany(() => Personnage, (personnage) => personnage.cartoon, { cascade: true })
  personnages?: Personnage[];
}