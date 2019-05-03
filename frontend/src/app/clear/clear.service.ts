import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../services/config.service';

@Injectable({
  providedIn: 'root'
})
export class ClearService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
  }


  clearNewsFeed(code, token) {
    return this.http.post(`${this.config.api}/admin/news-feed/clear/`, {code}, {headers: {Authorization: `Bearer ${token}`}});
  }

  clearComment(code, token) {
    return this.http.post(`${this.config.api}/admin/comment/clear/`, {code}, {headers: {Authorization: `Bearer ${token}`}});
  }
}
