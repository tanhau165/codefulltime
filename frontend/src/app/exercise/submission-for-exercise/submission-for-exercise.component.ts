import {Component, Input, OnInit} from '@angular/core';
import {SubmissionService} from '../../submit/submission.service';

@Component({
  selector: 'app-submission-for-exercise',
  templateUrl: './submission-for-exercise.component.html',
  styleUrls: ['./submission-for-exercise.component.css']
})
export class SubmissionForExerciseComponent implements OnInit {

  @Input() codeExercise: string;
  submission: any[] = [];

  constructor(
    private smS: SubmissionService
  ) {
  }

  ngOnInit() {
    this.smS.getWithExercise(this.codeExercise).subscribe(
      res => {
        res.submissions.forEach(s => {
          this.submission.push(s);
        });
      }
    );
  }

}
