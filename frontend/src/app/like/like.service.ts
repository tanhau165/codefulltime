import {Injectable} from '@angular/core';
import {ConfigService} from '../services/config.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(
    private config: ConfigService,
    private http: HttpClient
  ) {
  }

  addLike(token, code_object): any {
    return this.http.post(`${this.config.api}/admin/like/add`, {code_object}, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
  }

  isLkie(token, code_object): any {
    return this.http.post(`${this.config.api}/admin/like/is-like`, {code_object}, {
      headers:
        {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
    });
  }

}
