import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ExerciseService} from '../../admin/exercise/exercise.service';
import {AuthService} from '../../services/auth.service';
import {SubmissionService} from '../../submit/submission.service';

declare let showdown: any;
declare let $: any;

@Component({
  selector: 'app-exercise-details',
  templateUrl: './exercise-details.component.html',
  styleUrls: ['./exercise-details.component.css']
})
export class ExerciseDetailsComponent implements OnInit {
  exercise_code: string;
  exercise: any;
  isLoggedIn: any;
  submission: any[] = [];

  constructor(
    private router: ActivatedRoute,
    private exerS: ExerciseService,
    private auth: AuthService
  ) {
    auth.authStatus.subscribe(value => this.isLoggedIn = value);
  }

  ngOnInit() {
    this.auth.changeMenuActive('Exercise');
    this.router.paramMap.subscribe(value => {
      this.exercise_code = value.get('exercise');
      this.exerS.get(this.exercise_code).subscribe(
        res => {
          this.exercise = res.exercise;
          const converter = new showdown.Converter();
          $('#content').html(converter.makeHtml(this.exercise.question));
        }
      );
    });

  }
}
