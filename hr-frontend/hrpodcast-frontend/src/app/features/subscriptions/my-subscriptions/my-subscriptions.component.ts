import { Component, OnInit } from '@angular/core';
import { PodcastService } from 'src/app/core/services/podcast.service';
import { Podcast } from 'src/app/models/podcast.model';
import { Subscription } from 'src/app/models/subscription.model';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-my-subscriptions',
  templateUrl: './my-subscriptions.component.html',
  styleUrls: ['./my-subscriptions.component.css']
})

export class MySubscriptionsComponent implements OnInit {
  subscribedPodcasts: Podcast[] = [];
  userId: string = '';

  constructor(private podcastService: PodcastService, private router: Router) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.userId = user?.id;
    }

    this.loadSubscriptions();

  }

  loadSubscriptions(): void {
    this.podcastService.getUserSubscriptions(this.userId).subscribe({
      next: (subs) => {
        const podcastIds = subs.map(s => s.podcastId);
        // Fetch each podcast detail
        Promise.all(
          podcastIds.map(id =>
            lastValueFrom(this.podcastService.getPodcastById(id)).catch(() => undefined)
          )
        ).then((results: (Podcast | undefined)[]) => {
          this.subscribedPodcasts = results.filter((p): p is Podcast => p !== undefined);
        });
      },
      error: (err) => console.error('❌ Failed to load subscriptions', err)
    });
  }

  unsubscribe(podcastId: string): void {
    this.podcastService.unsubscribe(podcastId, this.userId).subscribe({
      next: () => {
        this.subscribedPodcasts = this.subscribedPodcasts.filter(p => p.podcastId !== podcastId);
        this.router.navigate(['/subscriptions']);
      },
      error: (err) => console.error('❌ Failed to unsubscribe', err)
    });
  }

  goToPodcast(podcastId: string): void {
    this.router.navigate(['/podcasts', podcastId]);
  }
}
