import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent implements OnInit {

  active: string;

  constructor(
    private auth: AuthService
  ) {
    this.auth.menuAdminActive.subscribe(value => this.active = value);
  }

  ngOnInit() {
  }

}
