export interface Podcast {
  podcastId: string;
  title: string;
  description: string;
  category: string;
  coverImage: string;
  creatorId?: string;
  isApproved: boolean;
}
