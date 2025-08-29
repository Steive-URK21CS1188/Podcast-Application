import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExitComponent } from './features/exit/exit/exit.component';
const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'podcasts',
    loadChildren: () => import('./features/podcast/podcast.module').then(m => m.PodcastModule)
  },
  {
    path: 'subscriptions',
    loadChildren: () =>
      import('./features/subscriptions/subscriptions.module').then(
        (m) => m.SubscriptionsModule
      )
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./features/profile/profile.module').then(
        (m) => m.ProfileModule
      )
  },
  { path: 'exit', component: ExitComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
