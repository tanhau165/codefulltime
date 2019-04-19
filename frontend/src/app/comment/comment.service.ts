import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../services/config.service';
import {TokenService} from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private token: TokenService
  ) {
  }

  getListComment(code_object): any {
    return this.http.get(`${this.config.api}/client/comments/get/object/${code_object}`);
  }

  addAnsCommet(code_comment, content, token): any {
    return this.http.post(`${this.config.api}/admin/ans-comment/add`, {
      code_comment,
      content
    }, {headers: {Authorization: `Bearer ${token}`}});
  }

  addCommet(code_object, content, token): any {
    return this.http.post(`${this.config.api}/admin/comment/add`, {
      code_object,
      content
    }, {headers: {Authorization: `Bearer ${token}`}});
  }

}
