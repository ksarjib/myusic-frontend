import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ArtistDashboardComponent } from './components/artist-dashboard/artist-dashboard.component';
import { AngularMaterialModule } from './shared/modules/material.module';
import { ListArtistsComponent } from './components/list-artists/list-artists.component';
import { ListMusicArtistComponent } from './components/list-music-artist/list-music-artist.component';
import { SharedModule } from './components/footer/shared.module';
import { UserDashboardModule } from './components/user-dashboard/user-dashboard.module';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyInterceptorInterceptor } from './my-interceptor.interceptor';
import { ListMusicUserComponent } from './components/list-music-user/list-music-user.component';
import { UploadMusicComponent } from './components/upload-song/upload-song.component';
import { ArtistDashboardModule } from './components/list-artists/artist.module';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    ArtistDashboardComponent,
    ListArtistsComponent,
    ListMusicUserComponent,
    UserDashboardComponent,
    ListMusicArtistComponent,
    UploadMusicComponent
  ],
  imports: [
    AngularMaterialModule,
    SharedModule,
    UserDashboardModule,
    ArtistDashboardModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: MyInterceptorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
