import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Episode } from 'src/app/models/episode.model';
import { PodcastService } from 'src/app/core/services/podcast.service';
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'app-episode-edit',
  templateUrl: './episode-edit.component.html',
  styleUrls: ['./episode-edit.component.css']
})
export class EpisodeEditComponent implements OnInit {
  @Input() episodeId: string = '';
  @Output() close = new EventEmitter<void>();
  @Output() episodeUpdated = new EventEmitter<void>();

  episode: Episode = {
    episodeId: '',
    podcastId: '',
    title: '',
    audioURL: '',
    duration: 0,
    releaseDate: new Date(),
    notes: ''
  };

  constructor(private podcastService: PodcastService, private http: HttpClient) { }

  ngOnInit(): void {
    if (this.episodeId) {
      this.podcastService.getEpisodeById(this.episodeId).subscribe({
        next: (data) => {
          this.episode = data;
        },
        error: (err) => {
          console.error('❌ Failed to load episode', err);
          alert('Failed to load episode');
          this.close.emit();
        }
      });
    }
  }

  update(): void {
    this.podcastService.updateEpisode(this.episodeId, this.episode).subscribe({
      next: () => {
        alert('✅ Episode updated successfully!');
        this.episodeUpdated.emit();
        this.close.emit();
      },
      error: (err) => {
        console.error('❌ Failed to update episode', err);
        alert('Update failed.');
      }
    });
  }

  uploadAudio(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('audio/')) {
      alert('❌ Only audio files allowed');
      return;
    }

    const formData = new FormData();
    formData.append('file', file); // ✅ MUST match backend param name: "file"

    this.http.post<{ url: string }>('https://localhost:5001/api/FileUpload/upload', formData).subscribe({
      next: (res) => {
        this.episode.audioURL = 'https://localhost:5001' + res.url; // ✅ save full URL
      },
      error: (err) => {
        console.error('❌ Failed to upload audio', err);
        alert('❌ Failed to upload audio');
      }
    });
  }

  cancel(): void {
    this.close.emit();
  }
}
