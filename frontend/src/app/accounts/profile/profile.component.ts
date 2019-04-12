import {Component, OnInit} from '@angular/core';
import {TokenService} from '../../services/token.service';
import {JarwisService} from '../../services/jarwis.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  constructor(
    private token: TokenService,
    private jwt: JarwisService,
    private auth: AuthService
  ) {
  }

  ngOnInit() {
    this.auth.changeMenuActive('Account');
    this.jwt.me(this.token.get()).subscribe(
      data => console.log(data),
      error1 => console.log(error1)
    );
  }
}
