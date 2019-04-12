import {Component, OnInit} from '@angular/core';
import {Exercises} from '../../models/exercises';
import {ExerciseService} from '../../admin/exercise/exercise.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

declare let $: any;

@Component({
  selector: 'app-exercise-all',
  templateUrl: './exercise-all.component.html',
  styleUrls: ['./exercise-all.component.css']
})
export class ExerciseAllComponent implements OnInit {
  exercises: any[] = [];

  constructor(
    private exerS: ExerciseService,
    private route: Router,
    private auth: AuthService
  ) {
  }

  ngOnInit() {
    this.auth.changeMenuActive('Exercise');
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

  goToExerciseDetails(exercise_code: string) {
    this.route.navigateByUrl('/exercise-details/' + exercise_code);
  }
}


