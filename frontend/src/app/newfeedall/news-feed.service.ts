import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../services/config.service';

@Injectable({
  providedIn: 'root'
})
export class NewsFeedService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
  }

  add(token, data): any {
    return this.http.post(`${this.config.api}/admin/news-feed/add`, data, {headers: {Authorization: `Bearer ${token}`}});
  }

  getAll(): any {
    return this.http.get(`${this.config.api}/client/news-feeds`);
  }

  getWithPage(page): any {
    return this.http.get(`${this.config.api}/client/news-feeds/page/${page}`);
  }
}
