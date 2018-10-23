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
  }

  type Mutation {
    savePinCode(pinCode: String!): User!
    validatePinCode(pinCode: String!): User!
    setPhone(phone: String!): User!
  }
`;

module.exports = typeDefs;
