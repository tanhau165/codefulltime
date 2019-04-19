import {Component, OnInit} from '@angular/core';
import {TeamServiceService} from '../../team/team-service.service';
import {CollectionsService} from '../collections.service';
import {TokenService} from '../../../services/token.service';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-add-collection',
  templateUrl: './add-collection.component.html',
  styleUrls: ['./add-collection.component.css']
})
export class AddCollectionComponent implements OnInit {
  errorMsg: any;
  listTeam: any;

  constructor(
    private teamS: TeamServiceService,
    private collectionS: CollectionsService,
    private token: TokenService,
    private auth: AuthService
  ) {
  }

  ngOnInit() {
    this.auth.changeMenuAdminActive('Collection');
    this.teamS.getAll().subscribe(
      res => {
        this.listTeam = res.teams;
      },
      error => {

      }
    );
  }

  addNewCollection(formAddCollection) {
    console.log(formAddCollection);
    this.collectionS.addNewCollection(this.token.get(), formAddCollection.value).subscribe(
      res => this.errorMsg = res.message,
      error => this.errorMsg = error.error.error
    );
  }
}
