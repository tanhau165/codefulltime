import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../services/config.service';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
  }

  getAll(): any {
    return this.http.get(`${this.config.api}/client/submissions`);
  }


  getWithExercise(exercise_code): any {
    return this.http.get(`${this.config.api}/client/submissions/get/exercise/${exercise_code}`);
  }

  getWithRow(row): any {
    return this.http.get(`${this.config.api}/client/submissions/get/top/${row}`);
  }


  add(data, token): any {
    return this.http.post(`${this.config.api}/admin/submission/add`, data, {headers: {Authorization: `Bearer ${token}`}});
  }

  sendToAPICheckScore(data) {
    return this.http.post('https://api.judge0.com/submissions?wait=true', data);
  }

}
