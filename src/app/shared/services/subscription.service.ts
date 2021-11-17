import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalConstants } from '../constants/GlobalConstants';
import { AuthenticationService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class SubscriptionService {

    base_url: string = '/subscribe';
    header = new HttpHeaders();

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.authService.getAccessToken()
        })
    };

    constructor(private http: HttpClient, private authService: AuthenticationService) { }

    subscribeArtist(userId: string, artistId: string, artistStageName: string) {
        let body = {
            userId: userId,
            artistId: artistId,
            artistStageName: artistStageName
        }
        console.log('user ' + userId + ' trying to subscribe artist ' + artistId);
        return this.http.post(GlobalConstants.API_ENDPOINT + this.base_url + '/', body, this.httpOptions);
    }
}
