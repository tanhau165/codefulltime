import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../services/config.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
  }

  listFriends(id): any {
    return this.http.get(`${this.config.api}/client/friends/get/id/${id}`);
  }

  listSaved(id) {
    return this.http.get(`${this.config.api}/client/saved/get/id/${id}`);
  }

  listMedias(id): any {
    return this.http.get(`${this.config.api}/client/medias/get/id/${id}`);
  }

  acceptFriend(id, token) {
    return this.http.post(`${this.config.api}/admin/friend/accept`, {id}, {headers: {Authorization: `Bearer ${token}`}});
  }

  removeFriend(id, token) {
    return this.http.post(`${this.config.api}/admin/friend/remove`, {id}, {headers: {Authorization: `Bearer ${token}`}});
  }

  removeById(id, token) {
    return this.http.post(`${this.config.api}/admin/friend/remove/id`, {id}, {headers: {Authorization: `Bearer ${token}`}});
  }
}
