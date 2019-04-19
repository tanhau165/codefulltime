import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Examination} from '../../../models/examination';
import {ExamminationServiceService} from '../exammination-service.service';
import {ConfigService} from '../../../services/config.service';
import {AuthService} from '../../../services/auth.service';

declare let $: any;

@Component({
  selector: 'app-view-examination',
  templateUrl: './view-examination.component.html',
  styleUrls: ['./view-examination.component.css']
})
export class ViewExaminationComponent implements OnInit {

  constructor(
    private router: ActivatedRoute,
    private examinationS: ExamminationServiceService,
    private config: ConfigService,
    private auth: AuthService
  ) {
  }

  code_collection: string;
  examinations: Examination[] = [];

  ngOnInit() {
    this.auth.changeMenuAdminActive('Examination');

    this.router.paramMap.subscribe(re => {
      this.code_collection = re.get('collection');

      if (this.code_collection === null) {
        this.examinationS.getAllExamination().subscribe(data => {
          data.examinations.forEach((collection) => {
            this.examinations.push(new Examination(collection));
          });
          $(document).ready(() => {
            $('#example').DataTable();
          });
        });
      } else {
        this.examinationS.getExaminationByCollection(this.code_collection).subscribe(data => {
          data.examinations.forEach((collection) => {
            this.examinations.push(new Examination(collection));
          });
          $(document).ready(() => {
            $('#example').DataTable();
          });
        });
      }
    });
  }

  numberOfChoose(examination: Examination) {
    let count = 0;
    if (examination.answer_a !== null) {
      count++;
    }
    if (examination.answer_b !== null) {
      count++;
    }

    if (examination.answer_c !== null) {
      count++;
    }

    if (examination.answer_d !== null) {
      count++;
    }
    if (examination.answer_e !== null) {
      count++;
    }

    if (examination.answer_f !== null) {
      count++;
    }
    if (examination.answer_g !== null) {
      count++;
    }
    if (examination.answer_h !== null) {
      count++;
    }
    if (examination.answer_i !== null) {
      count++;
    }
    if (examination.answer_j !== null) {
      count++;
    }
    if (examination.answer_k !== null) {
      count++;
    }
    return count;

  }

  getNameLanguage(type_of_language: string) {
    const arr = this.config.listLanguage.find(e => e.code === type_of_language);
    return arr.name;
  }
}
