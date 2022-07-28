import { gql } from 'mercurius-codegen';

export const Health = gql`
  type Health {
    version: String!
    uptime: BigInt!
    date: String!
    databaseLatency: Int!
  }
`;
