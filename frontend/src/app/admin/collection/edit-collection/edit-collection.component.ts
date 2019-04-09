import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Collections} from '../../../models/collections';
import {CollectionsService} from '../collections.service';
import {TeamServiceService} from '../../team/team-service.service';
import {TokenService} from '../../../services/token.service';

@Component({
  selector: 'app-edit-collection',
  templateUrl: './edit-collection.component.html',
  styleUrls: ['./edit-collection.component.css']
})
export class EditCollectionComponent implements OnInit {
  code_collection: string;
  name: string;
  code_team: string;
  status: number;

  collection: Collections;
  listTeam: any;
  errMsg: string;


  constructor(
    private router: ActivatedRoute,
    private collectionS: CollectionsService,
    private teamS: TeamServiceService,
    private token: TokenService
  ) {
  }

  ngOnInit() {
    this.teamS.getAll().subscribe(
      res => {
        this.listTeam = res.teams;
      },
      error => {

      }
    );
    this.router.paramMap.subscribe(value => {
      this.code_collection = value.get('collection');
      this.collectionS.getOneCollection(this.code_collection).subscribe(
        res => {
          const collection = res.data;
          this.code_collection = collection.code_collection;
          this.name = collection.name;
          this.code_team = collection.code_team;
          this.status = collection.status;
        },
        error => this.hanldeError(error)
      );
    });
  }

  hanldeError(err) {

  }

  editCollection(formAddCollection) {
    console.log(formAddCollection.value);
    this.collectionS.editCollection(this.token.get(), formAddCollection.value).subscribe(
      res => this.errMsg = res.message,
      err => this.errMsg = err.error.error
    );
  }
}
