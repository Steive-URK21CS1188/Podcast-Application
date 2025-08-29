import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PodcastService } from 'src/app/core/services/podcast.service';
import { Episode } from 'src/app/models/episode.model';
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'app-episode-create',
  templateUrl: './episode-create.component.html',
  styleUrls: ['./episode-create.component.css']
})
export class EpisodeCreateComponent {
  @Input() podcastId: string = '';
  @Output() close = new EventEmitter<void>();
  @Output() episodeCreated = new EventEmitter<void>();

  episode: Episode = {
    episodeId: '', // Leave blank, generated on backend
    podcastId: '', // will set manually below
    title: '',
    audioURL: '',
    duration: 0,
    releaseDate: new Date(),
    notes: ''
  };

  constructor(private podcastService: PodcastService, private http: HttpClient) { }

  create(): void {
    if (!this.podcastId || !this.episode.title || !this.episode.audioURL || !this.episode.duration || !this.episode.releaseDate) {
      alert('❌ All required fields must be filled');
      return;
    }

    const payload = {
      podcastId: this.podcastId,
      title: this.episode.title,
      audioURL: this.episode.audioURL,
      duration: this.episode.duration,
      releaseDate: this.episode.releaseDate,
      notes: this.episode.notes
    };

    this.podcastService.createEpisode(payload as any).subscribe({
      next: () => {
        alert('✅ Episode created');
        this.episodeCreated.emit();
        this.close.emit();
      },
      error: (err) => {
        console.error('❌ Error while creating episode', err);
        alert('❌ Error while creating episode');
      }
    });

  }
  /*
  uploadAudio(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    this.http.post<{ url: string }>('https://localhost:5001/api/FileUpload/upload', formData).subscribe({
      next: (res) => {
        this.episode.audioURL = res.url; // Save this in DB
      },
      error: (err) => {
        console.error('❌ Failed to upload audio', err);
        alert('Failed to upload audio');
      }
    });
  }

  
  uploadAudio(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    // Optional: Only allow mp3
    if (!file.type.includes('audio')) {
      alert('❌ Only audio files allowed');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    
        this.http.post<{ url: string }>('https://localhost:5001/api/FileUpload/upload', formData).subscribe({
          next: (res) => {
            this.episode.audioURL = res.url; // Save the relative URL
          },
          error: (err) => {
            console.error('❌ Failed to upload audio', err);
            alert('❌ Failed to upload audio');
          }
        });
      }
      
    this.http.post<{ url: string }>('https://localhost:5001/api/FileUpload/upload', formData).subscribe({
      next: (res) => {
        // ✅ Fix: Build full URL to ensure browser plays it
        this.episode.audioURL = 'https://localhost:5001' + res.url;
      },
      error: (err) => {
        console.error('❌ Failed to upload audio', err);
        alert('❌ Failed to upload audio');
      }
    });
  }
 
  uploadAudio(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('audio/')) {
      alert('Only audio files allowed');
      return;
    }

    const formData = new FormData();
    formData.append('file', file); // ✅ Must be 'file'

    this.http.post<{ url: string }>('https://localhost:5001/api/FileUpload/upload', formData).subscribe({
      next: (res) => {
        this.episode.audioURL = 'https://localhost:5001' + res.url;
      },
      error: (err) => {
        console.error('❌ Failed to upload audio', err);
        alert('❌ Failed to upload audio');
      }
    });
  }
   */

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
