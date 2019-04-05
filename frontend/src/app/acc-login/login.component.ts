import {Component, OnInit} from '@angular/core';
import {JarwisService} from '../services/jarwis.service';
import {TokenService} from '../services/token.service';
import {Route, Router} from '@angular/router';
import {MenuComponent} from '../menu/menu.component';
import {AuthService} from '../services/auth.service';

declare var $;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public error = null;

  constructor(
    private jwt: JarwisService,
    private token: TokenService,
    private router: Router,
    private auth: AuthService
  ) {
  }

  ngOnInit() {
    $('.ui.checkbox').checkbox();
  }

  login(formLogin) {
    this.jwt.login(formLogin.value).subscribe(
      data => {
        this.handleResponse(data);
      },
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    this.token.setName(data.name);
    this.token.handle(data.access_token);
    this.auth.changeAuthStatus(true);
    this.auth.changeName(data.name);
    this.router.navigateByUrl('/profile');
  }

  handleError(err) {
    this.error = err.error.errors;
  }

}
