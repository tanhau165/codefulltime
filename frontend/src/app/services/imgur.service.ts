import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImgurService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
  }

  uploadImage(fileToUpload): any {
    const endpoint = this.config.apiImgur;
    const formData: FormData = new FormData();
    formData.append('image', fileToUpload, fileToUpload.name);
    return this.http.post(endpoint, formData, {
      headers: {
        Authorization: 'Client-ID ' + this.config.clientKeyImgur,
        Accept: 'application/json'
      }
    });
  }
}
