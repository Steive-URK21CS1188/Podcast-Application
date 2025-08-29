import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PodcastRoutingModule } from './podcast-routing.module';
import { PodcastListComponent } from './podcast-list/podcast-list.component';
import { PodcastDetailComponent } from './podcast-detail/podcast-detail.component';
import { SharedModule } from 'src/app/features/shared/shared.module';
import { PodcastCreateComponent } from './podcast-create/podcast-create.component';
import { PodcastEditComponent } from './podcast-edit/podcast-edit.component';
import { EpisodeCreateComponent } from '../episode/episode-create/episode-create.component';
import { EpisodeEditComponent } from '../episode/episode-edit/episode-edit.component';


@NgModule({
  declarations: [
    PodcastListComponent,
    PodcastDetailComponent,
    PodcastCreateComponent,
    PodcastEditComponent,
    EpisodeCreateComponent,
    EpisodeEditComponent
  ],
  imports: [
    CommonModule,
    PodcastRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class PodcastModule { }
