import { gql } from 'mercurius-codegen';

export const Podcast = gql`
  type Podcast {
    id: BigInt!
    itunesId: BigInt
    title: String!
    author: String!
    description: String
    feedUrl: String!
    artwork: Artwork!
    episodes(count: Int!): [Episode!]!
    # categories: [Category!]!
    isSubscribed: Boolean!

    createdAt: BigInt!
    updatedAt: BigInt!
  }
`;
