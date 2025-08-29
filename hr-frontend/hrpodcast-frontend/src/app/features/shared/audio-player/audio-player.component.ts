import { Component, Input, OnInit } from '@angular/core';
import { Episode } from 'src/app/models/episode.model';
import { Podcast } from 'src/app/models/podcast.model';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent implements OnInit {
  @Input() episodes: Episode[] = [];
  @Input() podcast!: Podcast;

  currentIndex: number = 0;
  currentTime: number = 0;
  duration: number = 0;
  isPlaying: boolean = false;
  audio!: HTMLAudioElement;

  ngOnInit(): void {
    if (this.episodes.length) {
      this.setupAudio();
    }
  }

  setupAudio(): void {
    const currentEpisode = this.episodes[this.currentIndex];
    this.audio = new Audio(currentEpisode.audioURL);

    this.audio.addEventListener('loadedmetadata', () => {
      this.duration = this.audio.duration;
    });

    this.audio.addEventListener('timeupdate', () => {
      this.currentTime = this.audio.currentTime;
    });

    this.audio.addEventListener('ended', () => {
      this.next();
    });

  }

  @Input() audioUrl: string = '';
  showPlayer: boolean = false;

  play(url: string): void {
    this.audioUrl = url;
    this.showPlayer = true;
  }

  close(): void {
    this.showPlayer = false;
  }

  playPause(): void {
    if (!this.audio) return;
    this.isPlaying ? this.audio.pause() : this.audio.play();
    this.isPlaying = !this.isPlaying;
  }

  next(): void {
    this.audio.pause();
    if (this.currentIndex < this.episodes.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    this.setupAudio();
    if (this.isPlaying) this.audio.play();
  }

  previous(): void {
    this.audio.pause();
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.episodes.length - 1;
    }
    this.setupAudio();
    if (this.isPlaying) this.audio.play();
  }

  onSeek(event: any): void {
    this.audio.currentTime = event.target.value;
  }

  formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${ m }:${ s }`;
  }
}
