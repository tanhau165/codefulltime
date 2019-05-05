import {Component, OnInit} from '@angular/core';
import {BoxChat} from './models/box-chat';
import {Keyword} from './models/keyword';
import {MessageService} from './message/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  chatBoxes: BoxChat[] = [];

  constructor(
    private msS: MessageService
  ) {
    this.msS.boxList.subscribe(value => {
      this.chatBoxes = value;
      console.log('Length of box chat: ' + this.chatBoxes.length);
    });
  }

  ngOnInit() {

  }


  newChatBox(e) {
    console.log(5);
    // this.chatBoxes.push(new BoxChat({me, friends}));
  }
}
