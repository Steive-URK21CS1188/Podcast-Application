import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PodcastListComponent } from './podcast-list/podcast-list.component';
import { PodcastDetailComponent } from './podcast-detail/podcast-detail.component'; 
import { PodcastCreateComponent } from './podcast-create/podcast-create.component';
import { PodcastEditComponent } from './podcast-edit/podcast-edit.component';
import { EpisodeCreateComponent } from '../episode/episode-create/episode-create.component';
import { EpisodeEditComponent } from '../episode/episode-edit/episode-edit.component';

const routes: Routes = [
  { path: '', component: PodcastListComponent },
  { path: ':podcastId', component: PodcastDetailComponent },
  { path: 'create', component: PodcastCreateComponent },
  { path: 'edit/:podcastId', component: PodcastEditComponent },
  { path: ':podcastId/episodes/create', component: EpisodeCreateComponent },
  { path: ':podcastId/episodes/edit/:episodeId', component: EpisodeEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PodcastRoutingModule { }
