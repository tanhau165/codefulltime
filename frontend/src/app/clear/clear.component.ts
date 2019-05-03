import {Component, Input, OnInit} from '@angular/core';
import {JarwisService} from '../services/jarwis.service';
import {TokenService} from '../services/token.service';
import {ClearService} from './clear.service';

@Component({
  selector: 'app-clear',
  templateUrl: './clear.component.html',
  styleUrls: ['./clear.component.css']
})
export class ClearComponent implements OnInit {

  @Input() code_object: string;
  @Input() type_object: string;

  constructor(
    private clearS: ClearService,
    private token: TokenService,
  ) {
  }

  ngOnInit() {

  }

  clearObject() {

    if (this.type_object === 'news-feed') {
      this.clearS.clearNewsFeed(this.code_object, this.token.get()).subscribe(value => {
        console.log(value);
      });
    }

  }

}
