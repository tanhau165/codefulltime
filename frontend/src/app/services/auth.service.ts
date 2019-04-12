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

  private mm = new BehaviorSubject<string>('Home');
  menuActive = this.mm.asObservable();

  private admin = new BehaviorSubject<number>(this.token.getRole());
  roleAdmin = this.admin.asObservable();

  changeRole(role) {
    this.admin.next(role);
  }

  changeName(name: string) {
    this.nameAfterLoggedIn.next(name);
  }

  changeMenuActive(name: string) {
    this.mm.next(name);
  }

  changeAuthStatus(value: boolean) {
    this.isLoggedIn.next(value);
  }

  constructor(private token: TokenService) {
  }
}
