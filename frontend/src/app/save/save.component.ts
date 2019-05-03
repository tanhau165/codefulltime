import {Component, Input, OnInit} from '@angular/core';
import {SaveService} from './save.service';
import {TokenService} from '../services/token.service';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.css']
})
export class SaveComponent implements OnInit {

  @Input() code_object: string;
  @Input() type_object: string;
  message: any;

  constructor(
    private saveS: SaveService,
    private token: TokenService
  ) {
  }

  ngOnInit() {
  }


  click() {
    this.saveS.saveObject(this.token.get(), {code_object: this.code_object, type_object: this.type_object}).subscribe(res => {
      this.message = res.message;
      setTimeout(e => this.message = '', 2000);
    });
  }

}
