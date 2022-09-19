import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalConstants } from '../constants/GlobalConstants';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  id: string = '';
  isLogin = false;
  base_url: string = '/auth';
  userType: number;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // private currentUserSubject: BehaviorSubject<User>;
  // public currentUser: Observable<User>;
  constructor(private http: HttpClient, private route: ActivatedRoute) {
    // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    // this.currentUser = this.currentUserSubject.asObservable();
  }

  login(email: string, password: string) {
    console.log('user ' + email + 'trying to log in');
    return this.http.post(GlobalConstants.API_ENDPOINT + this.base_url + '/login', { email: email, password: password }, this.httpOptions)
      .pipe(map(user => {
        this.saveUserDataToStorage(user);
        return user;
      }));
  }

  register(userBody: any) {
    console.log(userBody);
    return this.http.post(GlobalConstants.API_ENDPOINT + this.base_url + '/register', userBody, this.httpOptions)
      .pipe(map((user: any) => {
        console.log('Trying to register');
        console.log(user);
        this.saveUserDataToStorage(user);
        return user;
      }));
  }

  saveUserDataToStorage(user: any) {
    this.isLogin = true;
    let userType = user?.payload?.role;
    localStorage.setItem('STATE', 'true');
    localStorage.setItem('ROLE', userType);
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('currentUser', JSON.stringify(user));
    console.log(`user type ${userType}`);
    if (userType == 1) {
      console.log('the user is an artist');
      console.log(user);
      localStorage.setItem('stageName', user?.payload.username);
    }
    console.log('Current user');
    console.log(localStorage.getItem('currentUser'));
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
    return this.userType;
  }

  getCurrentUser() {
    return this.getParsedUserFromStorage();
  }

  getParsedUserFromStorage() {
    let stringUser = localStorage.getItem('currentUser');
    return stringUser ? JSON.parse(stringUser) : null;
  }

  getStageName() {
    return localStorage.getItem('stageName');
  }

  getCurrentUserEmail() {
    console.log(this.getCurrentUser());
    return this.getCurrentUser()?.payload?.email;
  }

  getCurrentUserUsername() {
    console.log(this.getCurrentUser());
    return this.getCurrentUser()?.payload?.username;
  }

  getAccessToken() {
    console.log(this.getCurrentUser());
    return this.getCurrentUser()?.payload?.access_token;
  }

  getCurrentUserId() {
    console.log(this.getCurrentUser());
    return this.getCurrentUser()?.payload?._id;
  }

  logout() {
    localStorage.setItem('STATE', 'false');
    localStorage.removeItem('currentUser');
  }

  ngOnInit() {

  }

}
