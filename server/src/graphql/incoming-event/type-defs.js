const typeDefs = `
  type IncomingEvent {
    _id: ID!
    createdAt: Date!
    cannonId: String!
    eventType: String!
    eventValue: [String]!
  }

  type Query {
    incomingEvents: [IncomingEvent]!
  }
`;

module.exports = typeDefs;
