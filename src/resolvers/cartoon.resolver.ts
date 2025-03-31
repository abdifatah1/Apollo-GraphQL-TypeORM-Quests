import { Cartoon } from "../entities/cartoon.entities";
import { Genre } from "../entities/genre.entities";
import { Personnage } from "../entities/personnages.entities";
type GetOneCartoonByIdArgs = {
  id: string;
};
export const getCartoons = (): Promise<Cartoon[]> => {
  return Cartoon.find();
};

export const getOneCartoonById = (_: unknown, args: GetOneCartoonByIdArgs) => {
  return Cartoon.findOneBy({ id: +args.id });
};

export const createCartoon = async (
  _: unknown,
  args: { cartoon: Cartoon }
): Promise<Number> => {
  const { personnages, genres, ...rest } = args.cartoon;

  const newPersonnages = personnages?.map((pers) => {
    const myPers = new Personnage();
    myPers.name = pers.name;
    myPers.short_description = pers.short_description;
    myPers.role = pers.role;
    return myPers;
  }) as Personnage[];

  const newGenre = genres?.map((genre) => {
    const newGenre = new Genre();
    newGenre.name = genre.name;
    console.log(genre);
    return newGenre;
  }) as Genre[];

  const newCartoon: Cartoon = new Cartoon();
  Object.assign(newCartoon, rest);
  newCartoon.personnages = newPersonnages;
  newCartoon.genres = newGenre;

  const result = await newCartoon.save();
  console.log(result);
  return result.id;
};

export const deleteCartoon = async (
  _: unknown,
  args: GetOneCartoonByIdArgs
): Promise<string> => {
  const cartoonToDelete = await Cartoon.findOne({
    where: { id: +args.id },
    relations: ["personnages", "genres"],
  });

  if (cartoonToDelete) {
    await Promise.all([
      Personnage.delete({ cartoon: { id: cartoonToDelete.id } }),
      Genre.delete({ cartoon: { id: cartoonToDelete.id } }),
    ]);
    const result = await cartoonToDelete.remove();
    console.log(result);
    return `cartoon ${args.id} is deleted`;
  } else {
    return `${args.id} not found`;
  }
};
