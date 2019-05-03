import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenService} from '../../services/token.service';
import {ConfigService} from '../../services/config.service';

@Injectable({
  providedIn: 'root'
})
export class AddFriendService {

  constructor(private http: HttpClient, private config: ConfigService) {
  }

  sendRequest(token, friend_id: string): any {
    return this.http.post(`${this.config.api}/admin/friend/send-request-add`, {friend_id}, {headers: {Authorization: `Bearer ${token}`}});
  }

  accept(code_friend, token) {
    return this.http.post(`${this.config.api}/admin/friend/accept`, {code_friend}, {headers: {Authorization: `Bearer ${token}`}});
  }

  // removeByCodeFriend(code_friend, token) {
  //   return this.http.post(`${this.config.api}/admin/friend/clear/code-friend`, {code_friend}, {headers: {Authorization: `Bearer ${token}`}});
  //
  // }


  isFriend(friend_id, token): any {
    return this.http.post(`${this.config.api}/admin/friend/is-friend`, {friend_id}, {headers: {Authorization: `Bearer ${token}`}});
  }
}
