import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JarwisService} from '../services/jarwis.service';
import {ConfigService} from '../services/config.service';

@Injectable({
  providedIn: 'root'
})
export class RankServicesService {

  api = this.config.api;

  constructor(
    private http: HttpClient,
    private jwt: JarwisService,
    private config: ConfigService
  ) {
  }

  getRank(): any {
    return this.http.post(`${this.api}/admin/accounts`, {});
  }


  getTopRank(): any {
    return this.http.post(`${this.api}/admin/accounts/top`, {});
  }

}
