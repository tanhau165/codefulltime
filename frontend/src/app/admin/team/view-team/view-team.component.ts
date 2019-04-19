import {Component, OnInit} from '@angular/core';
import {Teams} from '../../../models/teams';
import {JarwisService} from '../../../services/jarwis.service';
import {TokenService} from '../../../services/token.service';
import {Router} from '@angular/router';
import {TeacherAdminService} from '../../teacher-admin/teacher-admin.service';
import {CollectionsService} from '../../collection/collections.service';
import {ExamminationServiceService} from '../../examination/exammination-service.service';
import {ExerciseService} from '../../exercise/exercise.service';
import {AuthService} from '../../../services/auth.service';

declare let $: any;

@Component({
  selector: 'app-view-team',
  templateUrl: './view-team.component.html',
  styleUrls: ['./view-team.component.css']
})
export class ViewTeamComponent implements OnInit {
  teams: Teams[] = [];

  constructor(private jwt: JarwisService, private token: TokenService, private router: Router, private teacherService: TeacherAdminService,
              private collectionS: CollectionsService, private examinationS: ExamminationServiceService,
              private exeS: ExerciseService, private auth: AuthService
  ) {
  }


  ngOnInit() {
    this.auth.changeMenuAdminActive('Team');
    this.teacherService.teams(this.token.get()).subscribe(
      data => {
        data.teams.forEach((team, index) => {
          this.teams.push(new Teams(team));
        });
        $(document).ready(() => {
          $('#teams').DataTable();
        });
      },
      error => console.log(error)
    );
  }

}
