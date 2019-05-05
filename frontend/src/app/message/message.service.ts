import {Injectable} from '@angular/core';
import {ConfigService} from '../services/config.service';
import {BehaviorSubject} from 'rxjs';
import {BoxChat} from '../models/box-chat';
import {Accounts} from '../models/accounts';
import {Message} from '../models/message';

declare let io: any;

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public socket: any;

  private boxChatOb = new BehaviorSubject<BoxChat[]>([]);
  public boxList = this.boxChatOb.asObservable();

  setBox(boxChat: BoxChat[]) {
    this.boxChatOb.next(boxChat);
  }


  addNewBoxChat(boxChat: BoxChat) {
    let ds = [];
    this.boxList.subscribe(value => ds = value);
    ds.push(boxChat);
    this.setBox(ds);
  }

  addMessageToChatBox(accountSend: Accounts, me: Accounts, friends: Accounts[], room: string, message: string, time: string) {
    let chatBoxes: BoxChat[] = [];
    this.boxList.subscribe(value => chatBoxes = value);
    chatBoxes.forEach((chatBox, index) => {
      if (room === chatBox.room) {
        chatBoxes[index].messages.push(new Message(accountSend, message, time));
      }
    });
    this.setBox(chatBoxes);
    this.boxList.subscribe(value => console.log(value));
  }

  constructor(private config: ConfigService) {
    this.socket = io(`${this.config.socketServer}`);
  }

  setSocketID(id) {
    this.socket.id = id;
  }

  createRoom(me: string, friend: string[]) {
    this.socket.emit('client-request-create-room', this.genRoom(me, friend));
  }

  genRoom(me: string, friend: string[]) {
    const arr = [];
    friend.forEach(f => {
      arr.push(f);
    });
    arr.push(me);
    arr.sort((a, b) => this.hashString(a) - this.hashString(b));
    return arr.join('_');
  }

  chat(message, me: Accounts, friends: Accounts[], time: string) {
    this.socket.emit('client-chat', {
      account: me,
      message,
      time,
      room: this.genRoom(me.id, this.getListFriend(friends))
    });
  }

  equalsListFriend(friends1: string[], friends2: string[]) {
    for (let i = 0; i < friends1.length; i++) {
      if (friends1[i] !== friends2[i]) {

        return false;
      }
    }
    return true;
  }

  getListFriend(friends: Accounts[]): string[] {
    const ds: string[] = [];
    friends.forEach(friend => ds.push(friend.id));
    return ds;
  }
  // getListFriendName(friends: Accounts[]): string[] {
  //   const ds: a[] = [];
  //   friends.forEach(friend => ds.push(friend.name));
  //   return ds;
  // }


  getSocket() {
    return this.socket;
  }

  hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash += Math.pow(str.charCodeAt(i) * 31, str.length - i);
    }
    return hash;
  }
}
