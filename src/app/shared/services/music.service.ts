import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from '../constants/GlobalConstants';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  base_url: string = '/music';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  fetchAllSubscribedMusics(userId: string) {
    // console.log('user with email ' + userId + 'trying to fetch subscribed musics');
    return this.http.get(GlobalConstants.API_ENDPOINT + this.base_url + '/user/' + userId);
  }

  fetchAllMyMusics(userId: string) {
    // console.log('fetching musics for artists' + userId);
    return this.http.get(GlobalConstants.API_ENDPOINT + this.base_url + '/artist/' + userId);
  }

  uploadMusic(formData: FormData) {
    console.log('Uploading new music');
    return this.http.post(GlobalConstants.API_ENDPOINT + this.base_url + '/', formData);
  }



  play(song: string) {
    return this.http.get(GlobalConstants.API_ENDPOINT + this.base_url + '/music/download/' + song);
  }
}
