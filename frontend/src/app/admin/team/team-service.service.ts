import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../../services/config.service';

@Injectable({
  providedIn: 'root'
})
export class TeamServiceService {

  api = this.config.api;

  constructor(private http: HttpClient, private config: ConfigService) {
  }

  addNewTeam(token, team): any {
    return this.http.post(`${this.api}/admin/team/add`, team,
      {headers: {Authorization: `Bearer ${token}`}}
    );
  }

  getTeam(code_team): any {
    return this.http.get(`${this.api}/client/team/get/${code_team}`);
  }

  editTeam(token, team): any {
    return this.http.post(`${this.api}/admin/team/edit`, team,
      {headers: {Authorization: `Bearer ${token}`}}
    );
  }

  getAll(): any {
    return this.http.get(`${this.api}/client/teams`);
  }

  getOfMe(token): any {
    return this.http.get(`${this.api}/admin/teams`, {headers: {Authorization: `Bearer ${token}`}});
  }
}
