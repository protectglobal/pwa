const typeDefs = `
  type User {
    _id: ID!
    createdAt: Date!
    email: String!
    phone: String
  }

  type Query {
    user: User
  }

  type Mutation {
    sendPassCode(email: String!): Response!
    setPhone(phone: String!): User!
  }
`;

module.exports = typeDefs;
