import {Component, OnInit} from '@angular/core';
import {JarwisService} from '../../../services/jarwis.service';
import {TokenService} from '../../../services/token.service';
import {Router} from '@angular/router';
import {TeacherAdminService} from '../../teacher-admin/teacher-admin.service';
import {CollectionsService} from '../../collection/collections.service';
import {ExamminationServiceService} from '../../examination/exammination-service.service';
import {ExerciseService} from '../exercise.service';
import {AuthService} from '../../../services/auth.service';

declare let $: any;

@Component({
  selector: 'app-view-exercise',
  templateUrl: './view-exercise.component.html',
  styleUrls: ['./view-exercise.component.css']
})
export class ViewExerciseComponent implements OnInit {
  exercises: any[] = [];

  constructor(private jwt: JarwisService, private token: TokenService, private router: Router, private teacherService: TeacherAdminService,
              private collectionS: CollectionsService, private examinationS: ExamminationServiceService,
              private exerS: ExerciseService, private auth: AuthService
  ) {
  }

  ngOnInit() {
    this.auth.changeMenuAdminActive('Exercise');
    this.exerS.getAll().subscribe(
      res => {
        res.exercises.forEach(v => {
          this.exercises.push(v);
        });
        $(document).ready(() => {
          $('#example').DataTable();
        });
      }
    );
  }

}
