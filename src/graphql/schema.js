import { addMockFunctionsToSchema, makeExecutableSchema } from "graphql-tools";
import { typeDefs } from "./typeDef";
import { typeResolvers } from "./resolvers";

const schema = makeExecutableSchema({
  typeDefs,
  typeResolvers
});

addMockFunctionsToSchema({
  schema,
  // mocks,
  preserveResolvers: true
});

export default schema;
