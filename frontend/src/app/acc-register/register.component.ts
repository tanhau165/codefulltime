import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JarwisService} from '../services/jarwis.service';
import {TokenService} from '../services/token.service';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public error = null;

  constructor(
    private jwt: JarwisService,
    private token: TokenService,
    private router: Router,
    private auth: AuthService
  ) {
  }

  ngOnInit() {
  }

  register(formRegister) {

    this.jwt.getIp().subscribe(ip => {
        const obj: any = ip;
        const data = {
          username: formRegister.value.username,
          password: formRegister.value.password,
          password_confirmation: formRegister.value.password_confirmation,
          email: formRegister.value.email,
          name: formRegister.value.name,
          role: 1,
          code_team: 'codefulltime',
          ip_client: obj.ip
        };
        this.jwt.register(data).subscribe(
          res => {
            this.handleResponse(res);
          },
          error => this.handleError(error)
        );
      }
    );
  }

  handleResponse(data) {
    this.token.handle(data.access_token);
    this.token.setName(data.name);
    this.auth.changeAuthStatus(true);
    this.router.navigateByUrl('/profile');
  }

  handleError(error) {
    this.error = error.error.errors;
  }

}

