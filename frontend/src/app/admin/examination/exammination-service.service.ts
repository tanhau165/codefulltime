import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../../services/config.service';

@Injectable({
  providedIn: 'root'
})
export class ExamminationServiceService {

  api = this.config.api;

  constructor(private http: HttpClient, private config: ConfigService) {
  }

  getExaminationByCollection(code_collection): any {
    return this.http.get(`${this.api}/client/examination/get/${code_collection}`);
  }

  getExamination(code_examination): any {
    return this.http.get(`${this.api}/client/examination/one/${code_examination}`);
  }

  addNewExamination(token, examination): any {
    return this.http.post(`${this.api}/admin/examination/add`, examination, {headers: {Authorization: `Bearer ${token}`}});

  }

  updateExamination(token, examination): any {
    return this.http.post(`${this.api}/admin/examination/edit`, examination, {headers: {Authorization: `Bearer ${token}`}});

  }

  getOneExamination(code_examination): any {
    return this.http.get(`${this.api}/client/examination/one/${code_examination}`);
  }

  addNewReportExamination(data, token): any {
    return this.http.post(`${this.api}/admin/rp-examination/add`, data, {headers: {Authorization: `Bearer ${token}`}});
  }
}
