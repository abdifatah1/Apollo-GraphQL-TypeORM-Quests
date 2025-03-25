/** Import des librairies */
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { getCartoons, getOneCartoonById } from "./resolvers/cartoon.resolver";

const typeDefs = `#graphql
  # This "Cartoon" type defines the queryable fields for every cartoon in our data source.
  type Personnage{
      id: Int
      name: String
      role: String
      short_description: String
    }

  type Cartoon {
    id: ID
    name: String
    description: String
    nb_of_episodes: Int
    nb_of_seasons: Int
    genres: [String]
    realisator: String
    author: String
    ft_diffusion: String
    personnages: [Personnage]
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
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
/** Fonction auto appellée (évite la mise en constante) permettant de lancer le serveur */
(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
