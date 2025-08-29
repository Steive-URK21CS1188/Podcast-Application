import { Component, EventEmitter, Output } from '@angular/core';
import { Podcast } from 'src/app/models/podcast.model';
import { PodcastService } from 'src/app/core/services/podcast.service';
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'app-podcast-create',
  templateUrl: './podcast-create.component.html',
  styleUrls: ['./podcast-create.component.css']
})
export class PodcastCreateComponent {
  @Output() close = new EventEmitter<void>();
  @Output() podcastCreated = new EventEmitter<void>();

  podcast: Partial<Podcast> = {
    title: '',
    description: '',
    category: '',
    coverImage: ''
  };

  constructor(private podcastService: PodcastService, private http: HttpClient) {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.podcast.creatorId = user.id;
    this.podcast.isApproved = false;
  }

  create(): void {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (!user || !user.id) {
      alert('User not authenticated.');
      return;
    }

    const payload = {
      title: this.podcast.title,
      description: this.podcast.description,
      category: this.podcast.category,
      coverImage: this.podcast.coverImage,
      creatorId: user.id,
      isApproved: false
    };

    // ✅ Type assertion bypasses strict type check for now
    this.podcastService.createPodcast(payload as any).subscribe({
      next: () => {
        alert('✅ Podcast created');
        this.podcastCreated.emit();
        this.close.emit();
      },
      error: (err) => {
        console.error('❌ Failed to create podcast', err);
        alert('❌ Failed to create podcast');
      }
    });
  }

  uploadCoverImage(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    this.http.post<{ url: string }>('https://localhost:5001/api/FileUpload/upload', formData).subscribe({
      next: (res) => {
        this.podcast.coverImage = 'https://localhost:5001' +res.url; // Save returned URL to DB
      },
      error: (err) => {
        console.error('❌ Failed to upload image', err);
        alert('Failed to upload image');
      }
    });
  }
 
  
  cancel(): void {
    this.close.emit();
  }
}
