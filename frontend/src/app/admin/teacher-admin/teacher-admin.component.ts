import {Component, OnInit} from '@angular/core';
import {JarwisService} from '../../services/jarwis.service';
import {TokenService} from '../../services/token.service';
import {Router} from '@angular/router';
import {TeacherAdminService} from './teacher-admin.service';
import {Teams} from '../../models/teams';
import {Collections} from '../../models/collections';
import {CollectionsService} from '../collection/collections.service';
import {Examination} from '../../models/examination';
import {ExamminationServiceService} from '../examination/exammination-service.service';
import {ExerciseService} from '../exercise/exercise.service';
import {Exercises} from '../../models/exercises';


@Component({
  selector: 'app-teacher-admin',
  templateUrl: './teacher-admin.component.html',
  styleUrls: ['./teacher-admin.component.css']
})

export class TeacherAdminComponent implements OnInit {
  teams: Teams[] = [];
  collections: Collections[] = [];
  examinations: Examination[] = [];
  exercises: any[] = [];


  currentExamination: Examination = null;


  currentTeam: string;
  currentCollection: string;


  constructor(private jwt: JarwisService, private token: TokenService, private router: Router, private teacherService: TeacherAdminService,
              private collectionS: CollectionsService, private examinationS: ExamminationServiceService,
              private exeS: ExerciseService
  ) {
  }

  ngOnInit() {

    this.loadData(this.token.get());

  }


  loadData(token) {
    this.teacherService.teams(token).subscribe(
      data => {
        data.teams.forEach((team, index) => {
          this.teams.push(new Teams(team));
        });
      },
      error => console.log(error)
    );
    this.exeS.getOfMe(this.token.get()).subscribe(
      vl => {
        vl.exercises.forEach(e => {
          this.exercises.push(e);
        });
      }
    );

  }

  clickToViewCollection(team_code) {
    this.currentTeam = team_code;
    this.collections = [];
    this.examinations = [];
    this.collectionS.getCollectionByTeam(team_code).subscribe(data => {
      data.collections.forEach((collection) => {
        this.collections.push(new Collections(collection));
      });
    });
  }

  clickToViewExamination(code_collection) {
    this.examinations = [];
    this.currentCollection = code_collection;
    this.examinationS.getExaminationByCollection(code_collection).subscribe(data => {
      data.examinations.forEach((collection) => {
        this.examinations.push(new Examination(collection));
      });
    });
  }

  detailsExamination(code_examination: string) {
    this.examinationS.getExamination(code_examination).subscribe(data => {
      this.currentExamination = new Examination(data.examination);
    });
  }
}
