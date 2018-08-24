const typeDefs = `
  type User {
    _id: ID!
    createdAt: Date!
    ip: String
    email: String!
    phone: String
  }

  type Query {
    user: User
  }

  type Mutation {
    setPhone(phone: String!): User!
  }
`;

module.exports = typeDefs;
