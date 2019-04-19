import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
  }

  uploadAvatar(fileToUpload, token): any {
    const formData: FormData = new FormData();
    formData.append('filename', fileToUpload, fileToUpload.name);
    return this.http.post(`${this.config.api}/admin/uploads/avatar`, formData, {headers: {Authorization: `Bearer ${token}`}});
  }


  umloadFileList(files: any, token): any {
    const formData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('filename[]', files[i]);
    }
    // console.log(formData);
    //
    return this.http.post(`${this.config.api}/admin/uploads/img`, formData, {headers: {Authorization: `Bearer ${token}`}});

  }
}
