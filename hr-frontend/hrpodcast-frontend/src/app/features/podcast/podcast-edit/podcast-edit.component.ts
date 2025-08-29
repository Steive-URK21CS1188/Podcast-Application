import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Podcast } from 'src/app/models/podcast.model';
import { PodcastService } from 'src/app/core/services/podcast.service';
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'app-podcast-edit',
  templateUrl: './podcast-edit.component.html',
  styleUrls: ['./podcast-edit.component.css']
})
export class PodcastEditComponent implements OnInit {
  @Input() podcastId: string = '';
  @Output() close = new EventEmitter<void>();
  @Output() podcastUpdated = new EventEmitter<void>();


  podcast: Podcast = {
    podcastId: '',
    title: '',
    description: '',
    category: '',
    coverImage: '',
    creatorId: '',
    isApproved: false
  };
  constructor(private podcastService: PodcastService, private http: HttpClient) { }

  ngOnInit(): void {
    if (this.podcastId) {
      this.podcastService.getPodcastById(this.podcastId).subscribe({
        next: (data) => {
          this.podcast = data;
        },
        error: (err) => {
          console.error('❌ Failed to load podcast', err);
          alert('Failed to load podcast');
          this.close.emit();
        }
      });
    }
  }

  update(): void {
    this.podcastService.updatePodcast(this.podcastId, this.podcast).subscribe({
      next: () => {
        alert('✅ Podcast updated successfully!');
        this.podcastUpdated.emit();
        this.close.emit();
      },
      error: (err) => {
        console.error('❌ Failed to update podcast', err);
        alert('Update failed.');
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
        this.podcast.coverImage = 'https://localhost:5001' + res.url; // Save returned URL to DB
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
