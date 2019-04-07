import {Injectable} from '@angular/core';
import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  api = this.config.api;
  private iss = {
    login: `${this.api}/login`,
    register: `${this.api}/register`,
  };

  constructor(private config: ConfigService) {
  }

  handle(accessToken) {
    this.set(accessToken);
  }

  setName(name) {
    localStorage.setItem('name', name);
  }

  getName() {
    const name = localStorage.getItem('name');
    return name === null || name === undefined ? 'Account' : name;
  }

  set(token) {
    localStorage.setItem('token', token);
  }

  get(): any {
    return localStorage.getItem('token');
  }

  remove() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
  }

  isValid() {
    const token = this.get();

    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }
    }
    return false;
  }

  payload(token) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    return this.isValid();
  }
}
