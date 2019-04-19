import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenService} from '../../services/token.service';
import {ConfigService} from '../../services/config.service';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  api = this.config.api;

  constructor(
    private http: HttpClient,
    private token: TokenService,
    private config: ConfigService
  ) {
  }

  addExercise(exercise, token): any {
    return this.http.post(`${this.api}/admin/exercise/add`, exercise, {headers: {Authorization: `Bearer ${token}`}});
  }

  getAll(): any {
    return this.http.get(`${this.api}/client/exercises`);
  }

  get(code_exercise): any {
    return this.http.get(`${this.api}/client/exercise/get/one/${code_exercise}`);
  }

  getOfMe(token): any {
    return this.http.post(`${this.api}/admin/exercises/me`, {}, {headers: {Authorization: `Bearer ${token}`}});
  }

  editExercise(exercise, token) {

    return this.http.post(`${this.api}/admin/exercise/edit`, exercise, {headers: {Authorization: `Bearer ${token}`}});
  }

  getExerciseSubmittedByID(id): any {
    return this.http.get(`${this.api}/client/exercises/get/exercise-submitted/${id}`);
  }

}
