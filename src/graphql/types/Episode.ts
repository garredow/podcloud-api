import { gql } from 'mercurius-codegen';

export const Episode = gql`
  type Episode {
    id: BigInt!
    podcastId: BigInt!
    date: BigInt!
    title: String!
    description: String
    progress: Int
    duration: Int
    fileSize: Int
    fileType: String
    fileUrl: String
    chaptersUrl: String
    transcriptUrl: String
    season: Int
    episode: Int
    episodeType: String
    podcast: Podcast!
    artwork: Artwork!
    createdAt: BigInt!
    updatedAt: BigInt!
  }
`;
