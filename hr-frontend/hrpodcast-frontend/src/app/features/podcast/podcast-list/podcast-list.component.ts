import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Podcast } from 'src/app/models/podcast.model';
import { PodcastService } from 'src/app/core/services/podcast.service';

@Component({
  selector: 'app-podcast-list',
  templateUrl: './podcast-list.component.html',
  styleUrls: ['./podcast-list.component.css']
})
export class PodcastListComponent implements OnInit {
  @Output() actionCompleted = new EventEmitter<void>();
  @Output() podcastDeleted = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
  approvedPodcasts: Podcast[] = [];
  unapprovedPodcasts: Podcast[] = [];
  subscribedPodcastIds: string[] = [];

  role: string = '';
  userId: string = '';

  showCreateModal = false;
  showEditModal = false;
  editingPodcastId: string = '';

  constructor(private podcastService: PodcastService, private router: Router) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.role = user.role;
      this.userId = user.id;
    }

    this.refreshAll();

  }

  refreshAll(): void {
    if (this.role === 'Admin') {
      this.loadAllPodcastsForAdmin();
    } else {
      this.loadApprovedPodcasts();
    }
    this.loadUserSubscriptions();
  }

  loadApprovedPodcasts(): void {
    this.podcastService.getAllApprovedPodcasts().subscribe({
      next: (res) => (this.approvedPodcasts = res),
      error: (err) => console.error('❌ Failed to load approved podcasts', err),
    });
  }

  loadAllPodcastsForAdmin(): void {
    this.podcastService.getAllPodcastsForAdmin().subscribe({
      next: (res) => {
        this.approvedPodcasts = res.filter((p) => p.isApproved);
        this.unapprovedPodcasts = res.filter((p) => !p.isApproved);
      },
      error: (err) => console.error('❌ Failed to load podcasts for admin', err),
    });
  }

  loadUserSubscriptions(): void {
    if (!this.userId) return;
    this.podcastService.getUserSubscriptions(this.userId).subscribe({
      next: (subs) => {
        this.subscribedPodcastIds = subs.map((s) => s.podcastId);
      },
      error: (err) => console.error('❌ Failed to load subscriptions', err),
    });
  }

  isSubscribed(podcastId: string): boolean {
    return this.subscribedPodcastIds.includes(podcastId);
  }
  toggleSubscription(podcastId: string): void {
    if (this.isSubscribed(podcastId)) {
      this.podcastService.unsubscribe(podcastId, this.userId).subscribe({
        next: () => {
          this.subscribedPodcastIds = this.subscribedPodcastIds.filter(id => id !== podcastId);
          this.router.navigate(['/podcasts']);
        },
        error: (err) => console.error('❌ Failed to unsubscribe', err)
      });
    } else {
      this.podcastService.subscribe(podcastId, this.userId).subscribe({
        next: () => {
          this.subscribedPodcastIds.push(podcastId);
          this.router.navigate(['/podcasts']);
        },
        error: (err) => console.error('❌ Failed to subscribe', err)
      });
    }
  }
/*
  toggleSubscription(podcastId: string): void {
    if (this.isSubscribed(podcastId)) {
      this.podcastService.unsubscribe(podcastId, this.userId).subscribe({
        next: () => {
          this.subscribedPodcastIds = this.subscribedPodcastIds.filter(id => id !== podcastId);
        },
        error: (err) => console.error('❌ Failed to unsubscribe', err)
      });
    } else {
      this.podcastService.subscribe(podcastId, this.userId).subscribe({
        next: () => {
          this.subscribedPodcastIds.push(podcastId);
        },
        error: (err) => console.error('❌ Failed to subscribe', err)
      });
    }
  }

  toggleApprove(podcast: Podcast): void {
    if (podcast.isApproved) {
      this.podcastService.unApprovePodcast(podcast.podcastId).subscribe({
        next: () => {
          this.podcastService.removePodcastSubscriptions(podcast.podcastId).subscribe();
          this.refreshAll();
        },
        error: (err) => console.error('❌ Failed to unapprove podcast', err)
      });
    } else {
      this.podcastService.approvePodcast(podcast.podcastId).subscribe({
        next: () => this.refreshAll(),
        error: (err) => console.error('❌ Failed to approve podcast', err)
      });
    }
  }
 
  deletePodcast(podcastId: string): void {
    if (!confirm('Are you sure you want to delete this podcast?')) return;

    this.podcastService.deletePodcast(podcastId).subscribe({
      next: () => this.refreshAll(),
      error: (err) => alert('❌ Delete failed')
    });

  }

   
  deletePodcast(podcastId: string): void {
    if (!confirm('Are you sure you want to delete this episode?')) return;

    this.podcastService.deletePodcast(podcastId).subscribe({
      next: () => {
        alert('✅ Podcast deleted');
      },
      error: (err) => alert('❌ Delete failed')
    });

  }
  

  deletePodcast(podcastId: string): void {
    if (!confirm('Are you sure you want to delete this podcast?')) return;

    this.podcastService.deletePodcast(podcastId).subscribe({
      next: () => {
        alert('✅ Podcast deleted');
        this.refreshAll(); // Reload podcast list
        this.router.navigate(['/podcasts']); // 🔁 Redirect back to podcast list
      },
      error: (err) => {
        console.error('❌ Failed to delete podcast', err);
        alert('❌ Delete failed');
      }
    });
  }
  */
  deletePodcast(podcastId: string): void {
    if (!confirm('Are you sure you want to delete this podcast?')) return;
    this.podcastService.removePodcastSubscriptions(podcastId).subscribe(() => {
      next: () => {
        
      }
    });
    this.podcastService.deletePodcast(podcastId).subscribe({
      next: () => {
        alert('✅ Podcast deleted successfully');
        this.router.navigate(['/podcasts']);
        this.refreshAll(); // refresh to reload list
      },
      error: (err) => {
        console.error('❌ Delete failed', err);
        if (err.status === 200 || err.status === 204) {
          // In case backend responds OK but no body
          alert('✅ Podcast deleted (response with no content)');
          this.refreshAll();
        } else {
          alert('❌ Failed to delete podcast');
        }
      }
    });
  }

  toggleApprove(podcast: Podcast): void {
    if (podcast.isApproved) {
      this.podcastService.removePodcastSubscriptions(podcast.podcastId).subscribe(() => {
      
      });
      this.podcastService.unApprovePodcast(podcast.podcastId).subscribe({
        next: () => {
          alert('✅ Unapproved podcast');

        },
        error: (err) => console.error('❌ Failed to unapprove podcast', err)
      });
    } else {
      this.podcastService.approvePodcast(podcast.podcastId).subscribe({
        next: () => {
          alert('✅ Approved successfully');
        },
        error: (err) => console.error('❌ Failed to approve podcast', err)
      });
    }
  }
  /*
  deletePodcast(podcastId: string): void {
    if (!confirm('Are you sure you want to delete this podcast?')) return;

    this.podcastService.deletePodcast(podcastId).subscribe({
      next: () => {
        alert('✅ Podcast deleted');
        this.router.navigate([`/podcasts`]);
      },
      error: (err) => alert('❌ Delete failed')
    });
  }
  */
  goToPodcastDetail(podcastId: string): void {
    this.router.navigate(['/podcasts', podcastId]);
  }

  openEditModal(podcastId: string): void {
    this.editingPodcastId = podcastId;
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.editingPodcastId = '';
  }

  handlePodcastUpdated(): void {
    this.closeEditModal();
    this.refreshAll();
  }

  openCreateModal(): void {
    this.showCreateModal = true;
  }

  closeCreateModal(): void {
    this.showCreateModal = false;
    this.refreshAll();
  }

  handleToggleRefresh(): void {
    this.refreshAll(); 
  }

}
