import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn = new BehaviorSubject<boolean>(this.token.loggedIn());
  authStatus = this.isLoggedIn.asObservable();

  private nameAfterLoggedIn = new BehaviorSubject<string>(this.token.getName());
  authName = this.nameAfterLoggedIn.asObservable();

  changeName(name: string) {
    this.nameAfterLoggedIn.next(name);
  }

  changeAuthStatus(value: boolean) {
    this.isLoggedIn.next(value);
  }

  constructor(private token: TokenService) {
  }
}
