import {Component, OnInit} from '@angular/core';
import {JarwisService} from '../../services/jarwis.service';
import {TokenService} from '../../services/token.service';
import {Route, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {NgControl} from '@angular/forms';


declare var $;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public error = null;
  public errorMessage = '';

  constructor(
    private jwt: JarwisService,
    private token: TokenService,
    private router: Router,
    private auth: AuthService
  ) {
  }

  ngOnInit() {
    this.auth.changeMenuActive('Account');
  }

  login(formLogin) {
    this.jwt.login(formLogin.value).subscribe(
      data => {
        this.errorMessage = '';
        this.handleResponse(data);
      },
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    this.token.handle(data.access_token);
    this.auth.changeAuthStatus(true);
    this.token.setName(data.name);
    this.auth.changeName(data.name);

    this.token.setRole(data.role + '');
    this.auth.changeRole(data.role);

    this.auth.changeRole(data.role !== 1 ? 'Admin' : 'Customer');
    this.router.navigateByUrl('/');
  }

  handleError(error: HttpErrorResponse) {
    this.errorMessage = error.error.error;
  }
}
