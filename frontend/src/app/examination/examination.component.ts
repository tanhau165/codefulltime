import {Component, OnInit} from '@angular/core';
import {Examination} from '../models/examination';
import {ExamminationServiceService} from '../admin/examination/exammination-service.service';
import {Teams} from '../models/teams';
import {TeamServiceService} from '../admin/team/team-service.service';
import {Collections} from '../models/collections';
import {CollectionsService} from '../admin/collection/collections.service';

declare var CodeMirror: any;

@Component({
  selector: 'app-examination',
  templateUrl: './examination.component.html',
  styleUrls: ['./examination.component.css']
})
export class ExaminationComponent implements OnInit {

  start = false;
  end = true;
  finish = false;

  // for setup
  listTeam: Teams[] = [];
  listCollection: Collections[] = [];

  listExamination: Examination[] = [];

  currentExamination: Examination = null;
  answer_correct: any;

  constructor(
    private examinationS: ExamminationServiceService,
    private teamS: TeamServiceService,
    private collectionS: CollectionsService
  ) {
  }

  ngOnInit() {
    this.teamS.getAll().subscribe(
      res => {
        res.teams.forEach((val) => {
          this.listTeam.push(new Teams(val));
        });
      }
    );


  }

  onChangeTeam(teamOption: HTMLSelectElement) {
    this.listCollection = [];
    this.collectionS.getCollectionByTeam(teamOption.value).subscribe(
      res => {
        res.collections.forEach((val) => {
          this.listCollection.push(new Collections(val));
        });
      }
    );
  }

  getStarted(formStarted) {
    const codeCollection = formStarted.value.code_collection;
    this.start = true;
    this.end = false;
    this.examinationS.getExaminationByCollection(codeCollection).subscribe(
      res => {
        res.examinations.forEach(v => {
          this.listExamination.push(new Examination(v));
        });
        this.currentExamination = this.getRandomExamination(this.currentExamination);
      },
      error => {
      }
    );
  }


  private getRandomExamination(currentExamination: Examination) {
    if (currentExamination === null) {
      const index = Math.floor(Math.random() * this.listExamination.length);
      this.currentExamination = this.listExamination[index];
      return this.currentExamination;
    } else {
      this.listExamination.slice(this.listExamination.indexOf(this.currentExamination), 1);
      const index = Math.floor(Math.random() * this.listExamination.length);
      this.currentExamination = this.listExamination[index];
      return this.currentExamination;
    }
  }

  check() {
    if (this.currentExamination.answer_correct === this.answer_correct) {
      // đúng và tiếp tục
      this.currentExamination = this.getRandomExamination(this.currentExamination);
    } else {
      // tính điểm lưu database và giải thích câu trả lời
      this.reChooseIfInCorrect();
      this.finish = true;
    }
  }

  reChooseIfInCorrect() {
    const answer_correct = this.currentExamination.answer_correct;
    if (answer_correct === 'A') {
      document.getElementById('row_A').style = 'background-color: #00bb00;';
    }
    if (answer_correct === 'B') {
      document.getElementById('row_B').style = 'background-color: #00bb00;';
    }
    if (answer_correct === 'C') {
      document.getElementById('row_C').style = 'background-color: #00bb00;';
    }
    if (answer_correct === 'D') {
      document.getElementById('row_D').style = 'background-color: #00bb00;';
    }

    // if (this.answer_correct === 'A') {
    //   document.getElementById('row_A').style = 'background-color: red;';
    // }
    // if (this.answer_correct === 'B') {
    //   document.getElementById('row_B').style = 'background-color: red;';
    // }
    // if (this.answer_correct === 'C') {
    //   document.getElementById('row_C').style = 'background-color: red;';
    // }
    // if (this.answer_correct === 'D') {
    //   document.getElementById('row_D').style = 'background-color: red;';
    // }

  }

  chooseA() {
    document.getElementById('ans_a').checked = true;
    this.answer_correct = 'A';
  }

  chooseB() {
    document.getElementById('ans_b').checked = true;
    this.answer_correct = 'B';
  }

  chooseC() {
    document.getElementById('ans_c').checked = true;
    this.answer_correct = 'C';
  }

  chooseD() {
    document.getElementById('ans_d').checked = true;
    this.answer_correct = 'D';
  }

  goToAnotherExamination() {
    this.start = false;
    this.end = true;
    this.finish = false;
    document.getElementById('row_A').style = '';
    document.getElementById('row_B').style = '';
    document.getElementById('row_C').style = '';
    document.getElementById('row_D').style = '';
    document.getElementById('ans_a').checked = false;
    document.getElementById('ans_b').checked = false;
    document.getElementById('ans_c').checked = false;
    document.getElementById('ans_d').checked = false;
    this.currentExamination = null;
    this.answer_correct = '';
    this.listExamination = [];
  }
}
