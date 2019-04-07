import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../../services/config.service';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {

  api = this.config.api;

  constructor(private http: HttpClient, private config: ConfigService) {
  }

  getCollectionByTeam(code_team): any {
    return this.http.get(`${this.api}/client/collection/get/${code_team}`);
  }
}
