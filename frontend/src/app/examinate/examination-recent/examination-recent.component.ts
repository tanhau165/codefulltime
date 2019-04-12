import {Component, OnInit} from '@angular/core';
import {Examination} from '../../models/examination';
import {ExamminationServiceService} from '../../admin/examination/exammination-service.service';

@Component({
  selector: 'app-examination-recent',
  templateUrl: './examination-recent.component.html',
  styleUrls: ['./examination-recent.component.css']
})
export class ExaminationRecentComponent implements OnInit {
  examinations: Examination[] = [];

  constructor(
    private exmS: ExamminationServiceService
  ) {
  }

  ngOnInit() {

    this.exmS.getTopRpExamination(5).subscribe(
      res => {
        res.rpexams.forEach(v => {
          this.examinations.push(v);
        });
      }
    );
  }
}
