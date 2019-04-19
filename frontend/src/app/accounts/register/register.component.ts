import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JarwisService} from '../../services/jarwis.service';
import {TokenService} from '../../services/token.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public errorMessage;

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

  register(formRegister) {

    this.jwt.getIp().subscribe(ip => {
        const obj: any = ip;
        this.jwt.getLocation(obj.ip).subscribe(location => {
            const data = {
              username: formRegister.value.username,
              password: formRegister.value.password,
              password_confirmation: formRegister.value.password_confirmation,
              email: formRegister.value.email,
              name: formRegister.value.name,
              role: 1,
              ip_client: obj.ip,
              location: this.getCountryCode(location.countryCode)
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
    );
  }

  getCountryCode(countryCode) {
    countryCode = countryCode.toLowerCase();
    if (countryCode !== 'jp' && countryCode !== 'vn' && countryCode !== 'en') {
      return 'en';
    }
    return countryCode;
  }

  handleResponse(data) {
    this.token.handle(data.access_token);
    this.token.setName(data.name);

    this.token.setRole(data.role + '');
    this.auth.changeRole(data.role);

    this.auth.changeAuthStatus(true);
    this.auth.changeName(data.name);
    this.router.navigateByUrl('/');
  }

  handleError(error) {
    this.errorMessage = error.error.error;
  }

}

