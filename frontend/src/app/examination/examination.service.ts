import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../services/config.service';

@Injectable({
  providedIn: 'root'
})
export class ExaminationService {

  api = this.config.api;

  constructor(private http: HttpClient, private config: ConfigService) {
  }

  getExaminationByCollection(code_collection): any {
    return this.http.get(`${this.api}/client/examination/get/${code_collection}`);
  }

  getExamination(code_examination): any {
    return this.http.get(`${this.api}/client/examination/one/${code_examination}`);
  }

}
