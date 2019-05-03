import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../services/config.service';

@Injectable({
  providedIn: 'root'
})
export class SaveService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
  }

  saveObject(token, data): any {
    return this.http.post(`${this.config.api}/admin/save/add`, data, {headers: {Authorization: `Bearer ${token}`}});
  }
}
