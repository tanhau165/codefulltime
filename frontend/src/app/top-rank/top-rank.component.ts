import { Component, OnInit } from '@angular/core';
import {Accounts} from '../models/accounts';
import {RankServicesService} from '../rank/rank-services.service';

@Component({
  selector: 'app-top-rank',
  templateUrl: './top-rank.component.html',
  styleUrls: ['./top-rank.component.css']
})
export class TopRankComponent implements OnInit {

  topRank: Accounts[] = [];

  constructor(
    private rankS: RankServicesService
  ) {
  }

  ngOnInit() {
    this.rankS.getTopRank().subscribe(res => {
        res.accounts.forEach((v) => {
          this.topRank.push(new Accounts(v));
        });
      },
      error => {
      }
    );
  }
}
