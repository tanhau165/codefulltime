import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-ttacount',
  templateUrl: './ttacount.component.html',
  styleUrls: ['./ttacount.component.css']
})
export class TTAcountComponent implements OnInit {

  @Input() account: any;

  constructor() {
  }

  ngOnInit() {
  }

}
