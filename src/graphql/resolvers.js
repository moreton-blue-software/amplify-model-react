import { GraphQLScalarType } from "graphql";

const awsDateType = new GraphQLScalarType({
  name: "AWSDateTime",
  description: "Description of my custom scalar type",
  serialize(value) {
    let result;
    // Implement your own behavior here by setting the 'result' variable
    return result;
  },
  parseValue(value) {
    let result;
    // Implement your own behavior here by setting the 'result' variable
    return result;
  },
  parseLiteral(ast) {
    switch (
      ast.kind
      // Implement your own behavior here by returning what suits your needs
      // depending on ast.kind
    ) {
    }
  }
});

const awsDateTimeType = new GraphQLScalarType({
  name: "AWSDateTime",
  description: "Description of my custom scalar type",
  serialize(value) {
    let result;
    // Implement your own behavior here by setting the 'result' variable
    return result;
  },
  parseValue(value) {
    let result;
    // Implement your own behavior here by setting the 'result' variable
    return result;
  },
  parseLiteral(ast) {
    switch (
      ast.kind
      // Implement your own behavior here by returning what suits your needs
      // depending on ast.kind
    ) {
    }
  }
});

export const typeResolvers = {
  AWSDate: awsDateType,
  AWSDateTime: awsDateTimeType
};
