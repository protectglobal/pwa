const typeDefs = `
  type OutgoingEvent {
    _id: ID!
    createdAt: Date!
    userId: ID!
    cannonId: String!
    eventType: String!
    eventValue: [String]!
  }

  input OutgoingEventInput {
    userId: ID!
    cannonId: String!
    eventType: String!
    eventValue: String!
  }

  type Query {
    outgoingEvents: [OutgoingEvent]!
  }

  type Mutation {
    postEvent(event: OutgoingEventInput!): Response!
  }
`;

module.exports = typeDefs;
