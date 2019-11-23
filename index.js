const { GraphQLServer } = require("graphql-yoga");
const fetch = require("node-fetch");

const typeDefs = `
  type Query {
    getPerson(id: Int!): Person
  }
  type Person {
    name: String
    height: String
  }
`;

const resolvers = {
  Query: {
    getPerson: async (_, { id }) => {
      const response = await fetch(`https://swapi.co/api/people/${id}/`);
      return response.json();
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("Server is running on localhost:4000"));