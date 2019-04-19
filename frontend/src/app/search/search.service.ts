import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../services/config.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
  }

  getAll(): any {
    return this.http.get(`${this.config.api}/client/key-words`);
  }

  add(key_word): any {
    return this.http.get(`${this.config.api}/client/key-word/search/${key_word}`);
  }
}
