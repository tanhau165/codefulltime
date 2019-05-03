import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenService} from '../../services/token.service';
import {AddFriendService} from './add-friend.service';
import {BehaviorSubject} from 'rxjs';
import {ProfileService} from '../../profile/profile.service';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent implements OnInit {
  message = 'Add friend';
  isFriend = -1; // 0: no friend , 1 sent request, 2 friend
  @Input() friend_id: string;

  private isFriendObserver = new BehaviorSubject<number>(this.isFriend);
  isFriendObs = this.isFriendObserver.asObservable();

  constructor(
    private addFS: AddFriendService,
    private proS: ProfileService,
    private token: TokenService
  ) {
    this.isFriendObs.subscribe(value => this.isFriend = value);
  }

  ngOnInit() {
    this.addFS.isFriend(this.friend_id, this.token.get()).subscribe(value => this.setIsFriend(value.message));
  }

  setIsFriend(value: number) {
    this.isFriendObserver.next(value);
  }

  sendRequest() {
    this.addFS.sendRequest(this.token.get(), this.friend_id).subscribe(res => {
      this.message = res.message;
      this.setIsFriend(1);
      setTimeout(() => this.message = '', 1000);
    });
  }


  removeFriend(friend_id: string) {
    this.proS.removeFriend(friend_id, this.token.get()).subscribe(value => {
      this.setIsFriend(0);
      this.message = 'Add friend';
    });
  }
}
