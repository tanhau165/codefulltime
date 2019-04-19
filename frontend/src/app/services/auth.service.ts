import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TokenService} from './token.service';
import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn = new BehaviorSubject<boolean>(this.token.loggedIn());
  authStatus = this.isLoggedIn.asObservable();

  private nameAfterLoggedIn = new BehaviorSubject<string>(this.config.ucwords(this.token.getName()));
  authName = this.nameAfterLoggedIn.asObservable();

  private mm = new BehaviorSubject<string>('Home');
  menuActive = this.mm.asObservable();

  private mmAdmin = new BehaviorSubject<string>('Home');
  menuAdminActive = this.mmAdmin.asObservable();

  private admin = new BehaviorSubject<number>(this.token.getRole());
  roleAdmin = this.admin.asObservable();

  changeRole(role) {
    this.admin.next(role);
  }

  changeName(name: string) {
    this.nameAfterLoggedIn.next(this.config.ucwords(name));
  }

  changeMenuActive(name: string) {
    this.mm.next(name);
  }

  changeMenuAdminActive(name: string) {
    this.mmAdmin.next(name);
  }

  changeAuthStatus(value: boolean) {
    this.isLoggedIn.next(value);
  }

  constructor(private token: TokenService, private config: ConfigService) {
  }
}
