import { gql } from 'mercurius-codegen';

export const Artwork = gql`
  type Artwork {
    podcastId: BigInt!
    url: String
    data(size: Int, blur: Int): String
    palette: Palette
  }
`;
