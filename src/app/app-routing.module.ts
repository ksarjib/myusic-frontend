import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistDashboardComponent } from './components/artist-dashboard/artist-dashboard.component';
import { ListArtistsComponent } from './components/list-artists/list-artists.component';
import { ListMusicArtistComponent } from './components/list-music-artist/list-music-artist.component';
import { ListMusicUserComponent } from './components/list-music-user/list-music-user.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UploadMusicComponent } from './components/upload-song/upload-song.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';

const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'register', component: SignUpComponent },
  { path: 'login', component: SignInComponent },
  {
    path: 'artist/dashboard', component: ArtistDashboardComponent,
    children: [
      { path: '', component: ListMusicArtistComponent },
      { path: 'upload', component: UploadMusicComponent }
    ]
  },
  {
    path: 'user/dashboard', component: UserDashboardComponent,
    children: [
      { path: '', component: ListArtistsComponent },
      { path: 'musics', component: ListMusicUserComponent }
    ]
  },
  { path: '**', component: SignInComponent }
  // {path: '/register', loadChildren: () => import('./sign-up/sign-up.module').then(m => m.SignUpModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
