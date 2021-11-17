import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalConstants } from '../constants/GlobalConstants';
import { AuthenticationService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class ArtistService {

    base_url: string = '/auth';
    header = new HttpHeaders();

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.authService.getAccessToken()
        })
    };

    constructor(private http: HttpClient, private authService: AuthenticationService) { }

    fetchAllArtists(userId: string) {
        console.log('user ' + userId + 'trying to log in');
        return this.http.get(GlobalConstants.API_ENDPOINT + this.base_url + '/artists', this.httpOptions);
    }
}
