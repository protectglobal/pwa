const typeDefs = `
  type User {
    _id: ID!
    createdAt: Date!
    ip: String
    cannonId: String # TODO: ID
    email: String!
    phone: String
    pinCodeSet: Boolean!
  }

  type Query {
    user: User
    passCode(email: String!): Int!
  }

  type Mutation {
    sendPassCode(email: String!): Response!
    savePinCode(pinCode: String!): User!
    validatePinCode(pinCode: String!): User!
    setPhone(phone: String!): User!
  }
`;

module.exports = typeDefs;
