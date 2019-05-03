import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../profile.service';
import {TokenService} from '../../services/token.service';
import {ActivatedRoute} from '@angular/router';
import {Accounts} from '../../models/accounts';
import {JarwisService} from '../../services/jarwis.service';

declare let $: any;

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {

  friends: Accounts[] = [];
  friendsRequest: Accounts[] = [];
  friendsSent: Accounts[] = [];
  isOwner = false;

  constructor(
    private profileS: ProfileService,
    private token: TokenService,
    private route: ActivatedRoute,
    private jwt: JarwisService
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(value => {
      const id = value.get('id');
      this.profileS.listFriends(id).subscribe(value1 => {
        value1.friends.forEach(v => {
          this.friends.push(new Accounts(v));
        });
        value1.friendsRequest.forEach(v => {
          this.friendsRequest.push(new Accounts(v));
        });
        value1.friendsSent.forEach(v => {
          this.friendsSent.push(new Accounts(v));
        });
        this.jwt.me(this.token.get()).subscribe(
          data => {
            this.isOwner = id === data.id;
          }
        );
        $(document).ready(() => {
          $('#example').DataTable();
        });
      });
    });
  }

  acceptFriend(id: string) {
    this.profileS.acceptFriend(id, this.token.get()).subscribe(value => {
      const find = this.friendsRequest.find(s => s.id === id);
      this.friends.push(find);
      this.friendsRequest.splice(this.friendsRequest.indexOf(find), 1);
    });
  }

  removeRequest(id: any) {
    this.profileS.removeFriend(id, this.token.get()).subscribe(value => {
      const find = this.friendsRequest.find(s => s.id === id);
      this.friendsRequest.splice(this.friendsRequest.indexOf(find), 1);
    });
  }
}
