import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from '../message.service';
import {AccountsService} from '../../accounts/accounts.service';
import {Accounts} from '../../models/accounts';
import {Message} from '../../models/message';
import {BoxChat} from '../../models/box-chat';

declare let $: any;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() me: string;
  @Input() friends: string[];
  isMax = true;
  isShow = true;
  @Input() index: number;
  room: string;

  account: Accounts;
  friendsAccounts: Accounts[] = [];
  messages: Message[] = [];

  constructor(
    private messageS: MessageService,
    private accS: AccountsService
  ) {
    this.messageS.getSocket().on('server-send-client-chat', (response) => {
      if (this.messageS.genRoom(this.me, this.friends) === response.room) {
        this.messageS.addMessageToChatBox(response.account, this.account, this.friendsAccounts, response.room, response.message, response.time);
        this.messageS.boxList.subscribe(boxList => {
          boxList.forEach((boxChat, index) => {
            if (boxChat.room === response.room) {
              this.messages = boxChat.messages;
            }
          });
          $(document).ready(() => {
            $('[data-toggle="tooltip"]').tooltip();
          });
        });
      }
    });
  }

  ngOnInit() {
    this.accS.getUserByID(this.me).subscribe(value => this.account = value.account);
    this.friends.forEach(friend_id => {
      this.accS.getUserByID(friend_id).subscribe(value => this.friendsAccounts.push(new Accounts(value.account)));
    });
    this.room = this.messageS.genRoom(this.me, this.friends);
    $(document).ready(() => {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }

  genRoom() {

  }

  openForm() {
    document.getElementById('myForm').style.display = 'block';
  }

  closeBox() {
    let chatBoxes: BoxChat[] = [];
    const newChatBoxes: BoxChat[] = [];
    this.messageS.boxList.subscribe(value => chatBoxes = value);
    chatBoxes.forEach((chatBox, index) => {
      if (this.room !== chatBox.room) {
        newChatBoxes.push(chatBox);
      }
    });
    this.messageS.setBox(newChatBoxes);

  }

  sendChat(msg: HTMLInputElement, $event: KeyboardEvent) {
    if ($event.keyCode === 13) {
      this.messageS.chat(msg.value, this.account, this.friendsAccounts, this.getDate());
      msg.value = '';
    }
  }

  getDate() {
    const date = new Date();
    const a = date.toString().split('(');
    const s = a[0].trim();
    const strings = s.split(' ');
    const ds = [];

    strings.forEach((value, index) => {
      if (index < strings.length - 2) {
        ds.push(value);
      }
    });
    return ds.join(' ') + '  ' + strings[ds.length];
  }

  minAndMax() {
    this.isMax = !this.isMax;
  }

  getClass(index: number) {
    if (index === 0) {
      return 'index-0';
    }
    if (index === 1) {
      return 'index-1';
    }
    if (index === 2) {
      return 'index-2';
    }
    if (index === 3) {
      return 'index-3';
    }
    return 'index-4';
  }
}
