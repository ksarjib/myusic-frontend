import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalConstants } from '../constants/GlobalConstants';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from 'src/app/models/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const base_url: string = '/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  id: string = '';
  isLogin = false;

  roleAs: string;
  // private currentUserSubject: BehaviorSubject<User>;
  // public currentUser: Observable<User>;
  constructor(private http: HttpClient, private route: ActivatedRoute) {
    // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    // this.currentUser = this.currentUserSubject.asObservable();
  }

  login(email: string, password: string) {
    console.log('user ' + email + 'trying to log in');
    return this.http.post(GlobalConstants.API_ENDPOINT + base_url + '/login', { email: email, password: password }, httpOptions)
      .pipe(map(user => {
        this.isLogin = true;
        console.log(user);
        this.roleAs = "artist";
        localStorage.setItem('STATE', 'true');
        localStorage.setItem('ROLE', this.roleAs);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        // this.currentUserSubject.next(user);
        return user;
      }));
  }
  isLoggedIn() {
    const loggedIn = localStorage.getItem('STATE');
    if (loggedIn == 'true')
      this.isLogin = true;
    else
      this.isLogin = false;
    return this.isLogin;
  }

  getRole() {
    // this.roleAs = localStorage.getItem('ROLE');
    return this.roleAs;
  }

  getCurrentUser() {
    return localStorage.getItem('currentUser');
  }
  // logOut(id: string) {
  //   // this.fetchIdFromQueryParams();
  //   return this.http.delete(GlobalConstants.API_ENDPOINT + base_url + '/' + id, httpOptions);
  // }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    // this.currentUserSubject.next(null);
  }

  ngOnInit() {

  }

}
