import {Component, OnInit} from '@angular/core';
import {SubmissionService} from '../../submit/submission.service';
import {ExerciseService} from '../../admin/exercise/exercise.service';
import {UploadFileService} from '../../services/upload-file.service';
import {ActivatedRoute} from '@angular/router';

declare let $: any;

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent implements OnInit {
  submission: any[] = [];
  exercises: any[] = [];
  examinations: any[] = [];

  constructor(
    private smS: SubmissionService,
    private exS: ExerciseService,
    private ulS: UploadFileService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(value => {
      const id = value.get('id');
      this.loadSubmission(id);
      this.loadQuestionAnswer(id);
      this.loadExerciseSubmittedByID(id);
    });
  }

  loadSubmission(id) {
    this.smS.getById(id).subscribe(
      val => {
        val.submissions.forEach(submit => {
          this.submission.push(submit);
        });
        $(document).ready(() => {
          $('#example').DataTable();
        });
      }
    );
  }

  loadQuestionAnswer(id) {
    this.smS.getQuestionAnswer(id).subscribe(
      val => {
        val.examinations.forEach(submit => {
          this.examinations.push(submit);
        });
        $(document).ready(() => {
          $('#example1').DataTable();
        });
      }
    );
  }

  loadExerciseSubmittedByID(id) {
    this.exS.getExerciseSubmittedByID(id).subscribe(
      val => {
        val.exercises.forEach(e => {
          this.exercises.push(e);
        });
        $(document).ready(() => {
          $('#example2').DataTable();
        });
      }
    );
  }


}
