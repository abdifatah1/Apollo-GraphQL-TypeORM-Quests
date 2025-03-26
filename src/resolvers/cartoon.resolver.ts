import { default as cartoons } from "../../dataset.json";
import { Cartoon } from "../types/cartoon.type";
type GetOneCartoonByIdArgs = {
  id: string;
};
let data = cartoons;
export const getCartoons = (): Cartoon[] => {
  return data;
};

export const getOneCartoonById = (
  _: unknown,
  args: GetOneCartoonByIdArgs
): Cartoon => {
  return data.find((cartoon) => cartoon.id === +args.id) as Cartoon;
};

export const createCartoon = (
  _: unknown,
  args: { cartoon: Cartoon }
): Number => {
  const { personnages, ...rest } = args.cartoon;
  const newPersonnages = personnages.map((pers) => ({
    ...pers,
    id: Date.now(),
  }));
  const id = +`${data[data.length - 1].id + 1}`;
  const newCartoon: Cartoon = {
    ...rest,
    personnages: newPersonnages,
    id,
  };

  data.push(newCartoon);
  console.log(args);
  return id;
};

export const deleteCartoon = (
  _: unknown,
  args: GetOneCartoonByIdArgs
): string => {
  const cartoonToDelete = data.some((cartoon) => cartoon.id === +args.id);
  if (cartoonToDelete) {
    data = data.filter((d) => d.id !== +args.id);
    return `cartoon ${args.id} is deleted`;
  } else {
    return `${args.id} not found`;
  }
};
