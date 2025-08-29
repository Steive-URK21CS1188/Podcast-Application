import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from './layout/back-button/back-button.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { TopNavbarComponent } from './layout/top-navbar/top-navbar.component';
import { AudioPlayerComponent } from './audio-player/audio-player.component';

@NgModule({
  declarations: [
    BackButtonComponent,
    SidebarComponent,
    TopNavbarComponent,
    AudioPlayerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BackButtonComponent,
    SidebarComponent,
    TopNavbarComponent,
    AudioPlayerComponent
  ]
})
export class SharedModule { }
