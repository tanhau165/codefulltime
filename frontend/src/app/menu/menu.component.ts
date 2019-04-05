import {Component, OnInit} from '@angular/core';
import {TokenService} from '../services/token.service';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

declare var $;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  source = [
    {title: 'Andorra'},
    {title: 'United Arab Emirates'},
    {title: 'Afghanistan'},
    {title: 'Antigua'},
    {title: 'Anguilla'},
    {title: 'Albania'},
    {title: 'Armenia'},
    {title: 'Netherlands Antilles'},
    {title: 'Angola'},
    {title: 'Argentina'},
    {title: 'American Samoa'},
    {title: 'Austria'},
    {title: 'Australia'},
    {title: 'Aruba'},
    {title: 'Aland Islands'},
    {title: 'Azerbaijan'},
    {title: 'Bosnia'},
    {title: 'Barbados'},
    {title: 'Bangladesh'},
    {title: 'Belgium'},
    {title: 'Burkina Faso'},
    {title: 'Bulgaria'},
    {title: 'Bahrain'},
    {title: 'Burundi'}
    // etc
  ];


  constructor(
    private token: TokenService,
    private router: Router,
    private auth: AuthService
  ) {
    this.auth.authStatus.subscribe(value => this.isLoggedIn = value);
    this.auth.authName.subscribe(value => this.name = value);
  }

  public isLoggedIn: boolean;
  public name: string;


  ngOnInit() {
    $('.ui.search').search({source: this.source});
    $('.dropdown').dropdown({transition: 'drop'});
  }

  logout() {
    this.token.remove();
    this.auth.changeName('Account');
    this.auth.changeAuthStatus(false);
    this.auth.authStatus.subscribe(value => this.isLoggedIn = value);
    this.router.navigateByUrl('/');
  }
}
