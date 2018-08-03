const typeDefs = `
  type Event {
    _id: ID!
    createdAt: Date!
    cannonId: String!
    eventType: String!
    eventValue: [String]!
  }

  type Query {
    events: [Event]!
  }

  type Mutation {
    clearEvents: Response!
  }
`;

module.exports = typeDefs;