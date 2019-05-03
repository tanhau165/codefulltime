import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css']
})
export class SendComponent implements OnInit {
  @Input() code_object: string;
  @Input() type_object: string;
  message: any;
  constructor() { }

  ngOnInit() {
  }

}
