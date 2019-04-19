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

  getAllCollectionByTeam(token): any {
    return this.http.post(`${this.api}/admin/collection/list-collection/get`, {}, {headers: {Authorization: `Bearer ${token}`}});
  }

  addNewCollection(token, collection): any {
    return this.http.post(`${this.api}/admin/collection/add`, collection, {headers: {Authorization: `Bearer ${token}`}});
  }

  editCollection(token, collection): any {
    return this.http.post(`${this.api}/admin/collection/edit`, collection, {headers: {Authorization: `Bearer ${token}`}});
  }

  getOneCollection(code_collection): any {
    return this.http.get(`${this.api}/client/collection/one/${code_collection}`);
  }
}
