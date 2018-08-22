const typeDefs = `
  type PassCode {
    _id: ID!
    email: String!
    passCode: String!
  }

  type Query {
    passCode(email: String!): PassCode!
  }

  type Mutation {
    sendPassCode(email: String!): Response!
  }
`;

module.exports = typeDefs;
