import { gql } from 'mercurius-codegen';

export const User = gql`
  type User {
    id: String!
    firstName: String
    lastName: String
    email: String
    avatarUrl: String

    subscriptions: [Podcast!]!

    createdAt: BigInt!
    updatedAt: BigInt!
  }
`;
