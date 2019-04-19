import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public api = 'http://codefulltime.com/api';
  // public api = 'http://localhost:8000/api';

  public resource = 'http://codefulltime.com';
  public apiImgur = 'https://api.imgur.com/3/image';

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
  clientKeyImgur = 'ad3bc6d390e3cdf';

  constructor() {
  }

  ucwords(str) {
    str = (str + '').toLowerCase();
    return str.replace(/^([a-z])|\s+([a-z])/g, ($1) => {
      return $1.toUpperCase();
    });
  }
}
