import {Component, OnInit} from '@angular/core';
import {Collections} from '../../../models/collections';
import {JarwisService} from '../../../services/jarwis.service';
import {TokenService} from '../../../services/token.service';
import {Router} from '@angular/router';
import {TeacherAdminService} from '../../teacher-admin/teacher-admin.service';
import {CollectionsService} from '../collections.service';
import {ExamminationServiceService} from '../../examination/exammination-service.service';
import {ExerciseService} from '../../exercise/exercise.service';
import {AuthService} from '../../../services/auth.service';

declare let $: any;

@Component({
  selector: 'app-view-collection',
  templateUrl: './view-collection.component.html',
  styleUrls: ['./view-collection.component.css']
})
export class ViewCollectionComponent implements OnInit {
  collections: Collections[] = [];

  constructor(private jwt: JarwisService, private token: TokenService, private router: Router, private teacherService: TeacherAdminService,
              private collectionS: CollectionsService, private examinationS: ExamminationServiceService,
              private exeS: ExerciseService, private auth: AuthService
  ) {
  }

  ngOnInit() {
    this.auth.changeMenuAdminActive('Collection');
    this.collectionS.getAllCollectionByTeam(this.token.get()).subscribe(
      res => {
        res.collections.forEach(c => {
          this.collections.push(c);
        });
        $(document).ready(() => {
          $('#collections').DataTable();
        });
      }
    );
  }

}
