/** Import des librairies */
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import {
  createCartoon,
  deleteCartoon,
  getCartoons,
  getOneCartoonById,
} from "./resolvers/cartoon.resolver";
import { Personnage, PersonnageInput } from "./schemas/personnage.schema";
import { Cartoon, CartoonInput } from "./schemas/cartoon.schema";
import { dataSource } from "./db/client";
import { GenreInput, Genre } from "./schemas/genre.schema";

const typeDefs = `#graphql
  # This "Cartoon" type defines the queryable fields for every cartoon in our data source.
  type Cartoon ${Cartoon}
  type Personnage ${Personnage}
  type Genre ${Genre}

  input CartoonInput ${CartoonInput}
  input PersonnageInput ${PersonnageInput}
  input GenreInput ${GenreInput}

  type Mutation {
    createCartoon(cartoon: CartoonInput!): ID,
    deleteCartoon(id: ID!) : String
  }
  # The "Query" type is special: it lists all of the available queries
  type Query {
    getCartoons: [Cartoon],
    getOneCartoonById(id: ID!): Cartoon
  }
`;

const resolvers = {
  Query: {
    getCartoons,
    getOneCartoonById,
  },
  Mutation: {
    createCartoon,
    deleteCartoon,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
/** Fonction auto appellée (évite la mise en constante) permettant de lancer le serveur */
(async () => {
  await dataSource.initialize();
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
