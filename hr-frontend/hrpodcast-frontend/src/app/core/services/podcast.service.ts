import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Podcast } from '../../models/podcast.model';
import { Episode } from '../../models/episode.model';
import { Subscription } from '../../models/subscription.model';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PodcastService {

  private podcastUrl = `${environment.apiUrl}/Podcast`;
  private episodeUrl = `${environment.apiUrl}/Episode`;
  private subscriptionUrl = `${environment.apiUrl}/Subscription`;

  constructor(private http: HttpClient) { }

  // ==================== PODCASTS ====================

  getAllApprovedPodcasts(): Observable < Podcast[] > {
    return this.http.get<Podcast[]>(`${this.podcastUrl}/GetAllApprovedPodcasts`);
  }

  getAllUnApprovedPodcasts(): Observable < Podcast[] > {
    return this.http.get<Podcast[]>(`${this.podcastUrl}/GetAllUnApprovedPodcasts`);
  }

  getAllPodcastsForAdmin(): Observable < Podcast[] > {
    return this.http.get<Podcast[]>(`${this.podcastUrl}/GetAllPodcasts`);
  }

  getPodcastById(podcastId: string): Observable < Podcast > {
    return this.http.get<Podcast>(`${this.podcastUrl}/${podcastId}`);
  }

  createPodcast(podcast: Podcast): Observable < Podcast > {
    return this.http.post<Podcast>(`${this.podcastUrl}`, podcast);
  }

  updatePodcast(podcastId: string, podcast: Podcast): Observable < any > {
    return this.http.put(`${this.podcastUrl}/${podcastId}`, podcast);
  }

  deletePodcast(podcastId: string): Observable < any > {
    return this.http.delete(`${this.podcastUrl}/${podcastId}`);
  }

  approvePodcast(podcastId: string): Observable < any > {
    return this.http.put(`${this.podcastUrl}/approve/${podcastId}`, {});
  }

  unApprovePodcast(podcastId: string): Observable < any > {
    return this.http.put(`${this.podcastUrl}/unapprove/${podcastId}`, {});
  }

  // ==================== EPISODES ====================

  getAllEpisodes(): Observable < Episode[] > {
    return this.http.get<Episode[]>(`${this.episodeUrl}`);
  }

  getEpisodeById(episodeId: string): Observable < Episode > {
    return this.http.get<Episode>(`${this.episodeUrl}/${episodeId}`);
  }

  getEpisodesByPodcastId(podcastId: string): Observable < Episode[] > {
    return this.http.get<Episode[]>(`${this.episodeUrl}/by-podcast/${podcastId}`);
  }

  createEpisode(episode: Episode): Observable < Episode > {
    return this.http.post<Episode>(`${this.episodeUrl}`, episode);
  }

  updateEpisode(episodeId: string, episode: Episode): Observable < any > {
    return this.http.put(`${this.episodeUrl}/${episodeId}`, episode);
  }

  deleteEpisode(episodeId: string): Observable < any > {
    return this.http.delete(`${this.episodeUrl}/${episodeId}`);
  }

  // ==================== SUBSCRIPTIONS ====================

  subscribe(podcastId: string, userId: string): Observable < any > {
    return this.http.post(`${this.subscriptionUrl}/${podcastId}/${userId}`, {});
  }

  unsubscribe(podcastId: string, userId: string): Observable < any > {
    return this.http.delete(`${this.subscriptionUrl}/${podcastId}/${userId}`);
  }

  getUserSubscriptions(userId: string): Observable < Subscription[] > {
    return this.http.get<Subscription[]>(`${this.subscriptionUrl}/user/${userId}`);
  }

  getSubscriptionById(subscriptionId: string): Observable < Subscription > {
    return this.http.get<Subscription>(`${this.subscriptionUrl}/${subscriptionId}`);
  }

  deleteSubscriptionById(subscriptionId: string): Observable < any > {
    return this.http.delete(`${this.subscriptionUrl}/${subscriptionId}`);
  }

  removePodcastSubscriptions(podcastId: string): Observable<any> {
    return this.http.delete(`${this.subscriptionUrl}/podcast/${podcastId}`);
  }

}
