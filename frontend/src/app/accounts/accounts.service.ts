import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../services/config.service';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
  }

  changeAvatar(token, avatar): any {
    return this.http.post(`${this.config.api}/admin/account/change/avatar`, {avatar}, {headers: {Authorization: `Bearer ${token}`}});
  }

  changeInfo(token, data): any {
    return this.http.post(`${this.config.api}/admin/account/change/info`, data, {headers: {Authorization: `Bearer ${token}`}});
  }

  getUserByID(id): any {
    return this.http.get(`${this.config.api}/client/account/get/id/${id}`, {});

  }
}
