import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public api = 'http://spobiotri.site/api';
  // public api = 'http://localhost:8000/api';

  public listLanguage = [
    {id: '10', code: 'text/x-c++src', name: 'C++'},
    {id: '27', code: 'text/x-java', name: 'Java'},
    {id: '34', code: 'text/x-python', name: 'Python'},
    {id: '29', code: 'text/javascript', name: 'Javascript'},
    {id: '1', code: 'text/plain', name: 'Text/Plain Text'}
  ];

  public listLanguageSumbitable = [
    {id: '10', code: 'text/x-c++src', name: 'C++'},
    {id: '27', code: 'text/x-java', name: 'Java'},
    {id: '34', code: 'text/x-python', name: 'Python'},
  ];

  constructor() {
  }
}
