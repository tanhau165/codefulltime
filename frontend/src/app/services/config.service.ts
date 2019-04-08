import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public api = 'http://localhost:8000/api';

  public listLanguage = [
    {id: '', code: 'text/x-c++src', name: 'C++'},
    {id: '', code: 'text/x-java', name: 'Java'},
    {id: '', code: 'text/x-python', name: 'Python'},
    {id: '', code: 'text/javascript', name: 'Javascript'},
    {id: '', code: 'markdown', name: 'Markdown'}
  ];

  constructor() {
  }
}
