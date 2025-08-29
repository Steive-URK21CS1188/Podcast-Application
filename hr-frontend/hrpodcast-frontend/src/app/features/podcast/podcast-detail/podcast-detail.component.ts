import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PodcastService } from 'src/app/core/services/podcast.service';
import { Podcast } from 'src/app/models/podcast.model';
import { Episode } from 'src/app/models/episode.model';

@Component({
  selector: 'app-podcast-detail',
  templateUrl: './podcast-detail.component.html',
  styleUrls: ['./podcast-detail.component.css']
})
export class PodcastDetailComponent implements OnInit, OnDestroy {
  podcastId!: string;
  podcast?: Podcast;
  episodes: Episode[] = [];
  role: string = '';
  currentIndex: number = -1;
  currentAudio: HTMLAudioElement | null = null;
  showPlayer: boolean = false;
  isPlaying: boolean = false;
  playAllMode: boolean = false;
  isPlayAll: boolean = false;

  showCreateModal: boolean = false;
  showEditModal: boolean = false;
  editingEpisodeId: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private podcastService: PodcastService) { }

  ngOnInit(): void {
    this.podcastId = this.route.snapshot.paramMap.get('podcastId')!;
    const user = JSON.parse(localStorage.getItem('user')!);
    this.role = user?.role || '';
    this.loadPodcast();
    this.loadEpisodes();
  }

  ngOnDestroy(): void {
    this.stopAudio();
  }

  loadPodcast(): void {
    this.podcastService.getPodcastById(this.podcastId).subscribe({
      next: (res) => (this.podcast = res),
      error: (err) => console.error('❌ Failed to load podcast', err),
    });
  }

  loadEpisodes(): void {
    this.podcastService.getEpisodesByPodcastId(this.podcastId).subscribe({
      next: (res) => (this.episodes = res),
      error: (err) => console.error('❌ Failed to load episodes', err),
    });
  }

  formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${ m }:${ s < 10 ? '0' : '' }${ s }`;
  }

  // 🎯 Episode Create/Edit/Delete

  openCreateModal(): void {
    this.showCreateModal = true;
  }

  closeCreateModal(): void {
    this.showCreateModal = false;
  }

  openEditModal(episodeId: string): void {
    this.editingEpisodeId = episodeId;
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.editingEpisodeId = '';
    this.showEditModal = false;
  }

  handleEpisodeChange(): void {
    this.loadEpisodes();
    this.closeCreateModal();
    this.closeEditModal();
  }

  playEpisode(index: number): void {
    this.stopAudio();
    this.currentIndex = index;
    const episode = this.episodes[this.currentIndex];
    this.currentAudio = new Audio(episode.audioURL);
    this.currentAudio.play();
    this.isPlaying = true;
    this.showPlayer = true;

    const audio = this.currentAudio;

    // Seek updates
    const syncProgress = () => {
        if (audio && this.isPlaying) {
          requestAnimationFrame(syncProgress);
        }
      };
      syncProgress();

      if (this.isPlayAll) {
        audio.onended = () => {
          this.nextEpisode();
        };
      } else {
        audio.onended = () => {
          this.isPlaying = false;
        };
      }
    }

    nextEpisode(): void {
      if (this.isPlayAll && this.currentIndex + 1 < this.episodes.length) {
        this.playEpisode(this.currentIndex + 1);
      }
    }

    hidePlayer(): void {
      this.stopAudio();
    }

    stopAudio(): void {
        if(this.currentAudio) {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
        this.currentAudio = null;
      }
      this.isPlaying = false;
      this.showPlayer = false;
      this.currentIndex = -1;
      this.isPlayAll = false;
    }


    seekAudio(event: any): void {
      if(this.currentAudio) {
      const value = event.target.value;
      this.currentAudio.currentTime = value;
    }
}

  
  
 
  playAll(): void {
    this.isPlayAll = true;
    this.playEpisode(0);
    if (this.currentAudio) {
      this.currentAudio.onended = () => this.nextEpisode();
    }
  }

  togglePlayPause(): void {
    if (this.isPlaying) {
      this.currentAudio?.pause();
      this.isPlaying = false;
    } else {
      this.currentAudio?.play();
      this.isPlaying = true;
    }
  }

  

  previousEpisode(): void {
    if (this.isPlayAll && this.currentIndex > 0) {
      this.playEpisode(this.currentIndex - 1);
    }
  }

  deleteEpisode(episodeId: string, podcastId: string): void {
    if (!confirm('Are you sure you want to delete this episode?')) return;
    this.podcastService.deleteEpisode(episodeId).subscribe({
      next: () => {
        alert('✅ Episode deleted');
        this.loadEpisodes();
        this.router.navigate(['/podcasts/'+podcastId]);
      },
      error: (err) => alert('❌ Delete failed')
    });

  }
}
