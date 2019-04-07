import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public api = 'http://localhost:8000/api';

  constructor() {
  }
}
