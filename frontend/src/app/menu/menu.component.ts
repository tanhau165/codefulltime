import {Component, OnInit} from '@angular/core';
import {TokenService} from '../services/token.service';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {JarwisService} from '../services/jarwis.service';
import {Keyword} from '../models/keyword';
import {SearchService} from '../search/search.service';

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
    private auth: AuthService,
    private jwt: JarwisService,
    private kwS: SearchService
  ) {
    this.auth.authStatus.subscribe(value => this.isLoggedIn = value);
    this.auth.authName.subscribe(value => this.name = value);
    this.auth.menuActive.subscribe(value => this.active = value);
    this.auth.roleAdmin.subscribe(value => {
      this.isTeacher = value;
    });

  }

  public isLoggedIn: boolean;
  public name: string;
  public isTeacher: number;
  public active: string;
  keywords: Keyword[] = [];

  ngOnInit() {
    this.kwS.getAll().subscribe(
      res => {
        res.keywords.forEach(v => {
          this.keywords.push(new Keyword(v));
        });
      }
    );
  }

  logout() {
    this.token.remove();
    this.auth.changeName('Account');
    this.auth.changeAuthStatus(false);
    this.auth.authStatus.subscribe(value => this.isLoggedIn = value);
    this.router.navigateByUrl('/');
  }

  goToTeacher() {
    this.jwt.me(this.token.get()).subscribe(
      data => {
        if (data.role !== 1) {
          this.router.navigateByUrl('/admin');
        } else {
          console.log('You are not a admin');
        }
      },
      error => {
        console.log('You must login first or contact to administrator');
      }
    );
  }

  notifyFeature() {
    $('#btnNotifyFeature').click();
  }

  search(ngForm) {
    this.kwS.add(ngForm.value.keyword).subscribe(res => {
      console.log(res);
    });
  }
}
