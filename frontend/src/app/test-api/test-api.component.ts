import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-test-api',
  templateUrl: './test-api.component.html',
  styleUrls: ['./test-api.component.css']
})
export class TestAPIComponent implements OnInit {
  token: any;

  constructor(
    private http: HttpClient
  ) {
  }

  ngOnInit() {
    this.http.post('http://localhost:57136/api/auth/login', {
      username: 'admin123',
      password: '1234'
    }).subscribe(value => {
      console.log(this.token);

    });
  }

  getMe() {
    console.log(this.http.post('http://localhost:57136/api/auth/me', {}, {headers:
        {
          Authorization: `Bearer ${this.token}`
        }}).subscribe(value => console.log(value)));
  }
}
