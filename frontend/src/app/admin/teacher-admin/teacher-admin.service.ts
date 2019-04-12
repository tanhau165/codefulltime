import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../../services/config.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherAdminService {

  api = this.config.api;

  constructor(private http: HttpClient, private config: ConfigService) {
  }

  teams(token): any {
    return this.http.get(`${this.api}/admin/teams`, {headers: {Authorization: `Bearer ${token}`}});
  }

}
