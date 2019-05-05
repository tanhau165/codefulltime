import {Message} from './message';

export class BoxChat {
  constructor(param: { me: string; friends: string[], room: string }) {
    this.me = param.me;
    this.friends = param.friends;
    this.messages = [];
    this.room = param.room;
    this.isShow = true;
  }

  public me: string;
  public friends: string[];
  public messages: Message[];
  public room: string;
  public isShow: boolean;

}
