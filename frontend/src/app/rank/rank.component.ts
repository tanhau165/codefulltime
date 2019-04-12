import {Component, OnInit} from '@angular/core';
import {RankServicesService} from './rank-services.service';
import {Accounts} from '../models/accounts';
import {AuthService} from '../services/auth.service';
declare let $: any;

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})



export class RankComponent implements OnInit {
  rank: Accounts[] = [];

  constructor(
    private rankS: RankServicesService,
    private auth: AuthService
  ) {
  }

  ngOnInit() {
    this.auth.changeMenuActive('Rank');
    this.rankS.getRank().subscribe(res => {
        res.accounts.forEach((v) => {
          this.rank.push(new Accounts(v));
        });
        $(document).ready(() => {
          $('#example').DataTable();
        });
      },
      error => {
      }
    );
  }

}
