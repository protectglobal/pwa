const typeDefs = `
  type Event {
    _id: ID!
    createdAt: Date!
    cannonId: String!
    eventType: String!
    eventValue: [String]!
  }

  input EventInput {
    cannonId: String!
    eventType: String!
    eventValue: String!
  }

  type Query {
    events: [Event]!
  }

  type Mutation {
    postEvent(event: EventInput!): Response!
    clearEvents: Response!
  }
`;

module.exports = typeDefs;
