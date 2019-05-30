import {Injectable} from '@angular/core';
import {IUser} from './user.model';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable()
export class AuthService {
  currentUser: IUser;

  constructor(private http: HttpClient) {
  }

  loginUser(userName: string, password: string) {
    const loginInfo = {username: userName, password: password};
    const options = {headers: {'Content-Type': 'application/json'}};

    return this.http.post('/api/login', loginInfo, options)
      .pipe(tap(data => {
        this.currentUser = <IUser>data['user'];
      }))
      .pipe(catchError(() => {
        return of(false);
      }));
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  updateCurrentUser(firstName: string, lastName: string) {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;

    const options = {headers: {'Content-Type': 'application/json'}};
    const url = `/api/users/${this.currentUser.id}`;

    return this.http.put(url, this.currentUser, options);
  }

  checkAuthenticationStatus() {
    this.http.get('/api/currentIdentity')
      .pipe(tap(data => {
        if (data instanceof Object) {
          this.currentUser = <IUser>data;
        }
      }))
      .subscribe();
  }

  logout() {
    this.currentUser = undefined;

    const options = {headers: {'Content-Type': 'application/json'}};
    return this.http.post('/api/logout', {}, options);
  }
}
