import { gql } from 'mercurius-codegen';

export const Palette = gql`
  type Palette {
    darkMuted: String
    darkVibrant: String
    lightMuted: String
    lightVibrant: String
    muted: String
    vibrant: String
    createdAt: BigInt!
    updatedAt: BigInt!
  }
`;
