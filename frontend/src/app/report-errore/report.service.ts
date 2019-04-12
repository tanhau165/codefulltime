import {Injectable} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../services/config.service';
import {TokenService} from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
  }

  addReport(data: any, token: string): any {
    return this.http.post(`${this.config.api}/admin/rp-error/add`, data, {headers: {Authorization: `Bearer ${token}`}});
  }

}
