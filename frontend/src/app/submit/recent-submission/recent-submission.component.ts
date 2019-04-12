import {Component, OnInit} from '@angular/core';
import {SubmissionService} from '../submission.service';

@Component({
  selector: 'app-recent-submission',
  templateUrl: './recent-submission.component.html',
  styleUrls: ['./recent-submission.component.css']
})
export class RecentSubmissionComponent implements OnInit {
  submission: any[] = [];

  constructor(
    private smS: SubmissionService
  ) {
  }

  ngOnInit() {
    this.smS.getWithRow(10).subscribe(
      val => {
        val.submissions.forEach(submit => {
          this.submission.push(submit);
        });
      }
    );
  }

}
