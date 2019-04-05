import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JarwisService {
  api = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {
  }

  register(data) {
    return this.http.post(`${this.api}/register`, data);
  }

  getIp() {
    return this.http.get('http://api.ipify.org/?format=json');
  }

  login(data): any {
    return this.http.post(`${this.api}/login`, data);
  }

  me(token): any {
    return this.http.post(`${this.api}/me`, {}, {headers: {Authorization: `Bearer ${token}`}});
  }

  refresh(token) {
    return this.http.post(`${this.api}/refresh`, {}, {headers: {Authorization: `Bearer ${token}`}});
  }

  sendPasswordResetLink(data) {
    return this.http.post(`${this.api}/sendPasswordResetLink`, data);
  }

  resetPassword(data) {
    return this.http.post(`${this.api}/resetPassword`, data);
  }

  changePass(data, token): any {
    return this.http.post(`${this.api}/changepass`, data, {headers: {Authorization: `Bearer ${token}`}});
  }

}
