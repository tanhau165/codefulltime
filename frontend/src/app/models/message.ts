import {Accounts} from './accounts';

export class Message {
  public account: Accounts;
  public message: string;
  public time: string;

  constructor(account: Accounts, message: string, time: string) {
    this.account = account;
    this.message = message;
    this.time = time;
  }

}
