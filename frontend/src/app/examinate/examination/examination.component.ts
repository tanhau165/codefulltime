import {Component, OnInit} from '@angular/core';
import {Examination} from '../../models/examination';
import {ExamminationServiceService} from '../../admin/examination/exammination-service.service';
import {Teams} from '../../models/teams';
import {TeamServiceService} from '../../admin/team/team-service.service';
import {Collections} from '../../models/collections';
import {CollectionsService} from '../../admin/collection/collections.service';
import {TokenService} from '../../services/token.service';
import {JarwisService} from '../../services/jarwis.service';
import {AuthService} from '../../services/auth.service';

declare var CodeMirror: any;
declare var showdown: any;
declare var $: any;

@Component({
  selector: 'app-examination',
  templateUrl: './examination.component.html',
  styleUrls: ['./examination.component.css']
})
export class ExaminationComponent implements OnInit {

  start = false;
  end = true;
  finish = false;
  win = false;

  msgCheckScore: string;

  score = 0;
  // for setup
  listTeam: Teams[] = [];
  listCollection: Collections[] = [];

  listExamination: Examination[] = [];
  listExaminationCodeCorrect: string[] = [];

  currentExamination: Examination = null;
  answer_correct: any;

  // information
  yourScore: number;
  name: string;
  location: string;
  currentCollection: any;

  editor: any;
  isLoggedIn = false;

  time = 0;

  timer: any;

  constructor(
    private examinationS: ExamminationServiceService,
    private teamS: TeamServiceService,
    private collectionS: CollectionsService,
    private token: TokenService,
    private jwt: JarwisService, private auth: AuthService
  ) {
    this.auth.authStatus.subscribe(value => this.isLoggedIn = value);
  }

  ngOnInit() {

    this.auth.changeMenuActive('Examination');

    if (this.token.get() !== null) {
      this.jwt.me(this.token.get()).subscribe(
        res => {
          this.yourScore = res.score;
          this.name = res.name;
          this.location = res.location;
          this.teamS.getByLocation(this.location).subscribe(
            resTeam => {
              resTeam.teams.forEach((val) => {
                this.listTeam.push(new Teams(val));
              });
            }
          );
        }
      );
    } else {
      this.teamS.getAll().subscribe(
        res => {
          res.teams.forEach((val) => {
            this.listTeam.push(new Teams(val));
          });
        }
      );
    }
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

  getStarted(code) {
    this.start = true;
    this.end = false;

    if (this.start) {
      this.timer = setInterval(() => this.time++, 1000);
    }

    this.examinationS.getExaminationByCollection(code).subscribe(
      res => {
        res.examinations.forEach(v => {
          this.listExamination.push(new Examination(v));
        });
        this.currentCollection = this.listCollection[0].code_collection;
        this.currentExamination = this.getRandomExamination(this.currentExamination);
        this.loadQuestionToHTML();
      },
      error => {
      }
    );
  }

  loadQuestionToHTML() {
    this.editor = CodeMirror.fromTextArea(document.getElementById('code'), {
        lineNumbers: true,
        styleActiveLine: true,
        matchBrackets: true,
        extraKeys: {
          F11: (cm) => {
            cm.setOption('fullScreen', !cm.getOption('fullScreen'));
          },
          Esc: (cm) => {
            if (cm.getOption('fullScreen')) {
              cm.setOption('fullScreen', false);
            }
          },
          'Ctrl-Space': 'autocomplete',
          'Alt-F': 'findPersistent',
          'Ctrl-Q': (cm) => {
            cm.foldCode(cm.getCursor());
          }
        },
        // mode: {name: `${this.currentExamination.type_of_language}`, globalVars: true},
        lineWrapping: true,
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        theme: 'dracula',
        readOnly: 'nocursor'
      }
    );
    this.editor.setValue(this.currentExamination.question);
  }


  private getRandomExamination(currentExamination: Examination) {
    if (currentExamination === null) {
      const index = Math.floor(Math.random() * this.listExamination.length);
      this.currentExamination = this.listExamination[index];
      return this.currentExamination;
    } else {
      this.listExamination.splice(this.listExamination.indexOf(this.currentExamination), 1);
      const index = Math.floor(Math.random() * this.listExamination.length);
      this.currentExamination = this.listExamination[index];
      return this.currentExamination;
    }
  }


  check(applike) {
    const check = $('#check');
    if (this.currentExamination.answer_correct === this.answer_correct) {
      check.html('<i class="fa fa-check-square-o" aria-hidden="true"></i> Correct');
      this.notifyIfCorrect(true).then(() => {
        // đúng và tiếp tục
        this.score++;
        this.listExaminationCodeCorrect.push(this.currentExamination.code_examination);
        const temp = this.currentExamination;
        this.currentExamination = this.getRandomExamination(this.currentExamination);
        if (this.editor !== null) {
          if (this.currentExamination !== undefined) {
            this.editor.setOption('mode', {name: `${this.currentExamination.type_of_language}`, globalVars: true});
            this.editor.setValue(this.currentExamination.question);
          }
        }
        if (this.currentExamination == null) {
          this.saveScore(false);
          this.currentExamination = temp;
          clearInterval(this.timer);
        } else {
          this.removeSelectAnswer();
        }
        check.html('Check');
        applike.changeCodeObject(this.currentExamination.code_examination);
      }).catch(e => console.log(e));
    } else {
      applike.changeCodeObject(this.currentExamination.code_examination);
      // tính điểm lưu database và giải thích câu trả lời
      this.reChooseIfInCorrect();
      clearInterval(this.timer);
      this.saveScore(true);
    }
  }

  reChooseIfInCorrect() { // chọn câu trả lời đúng nếu sai
    const answer_correct = this.currentExamination.answer_correct;
    if (answer_correct === 'A') {
      document.getElementById('row_A').style.backgroundColor = 'green';
    }
    if (answer_correct === 'B') {
      document.getElementById('row_B').style.backgroundColor = 'green';
    }
    if (answer_correct === 'C') {
      document.getElementById('row_C').style.backgroundColor = 'green';
    }
    if (answer_correct === 'D') {
      document.getElementById('row_D').style.backgroundColor = 'green';
    }
    if (answer_correct === 'E') {
      document.getElementById('row_E').style.backgroundColor = 'green';
    }
    if (answer_correct === 'F') {
      document.getElementById('row_F').style.backgroundColor = 'green';
    }
    if (answer_correct === 'G') {
      document.getElementById('row_G').style.backgroundColor = 'green';
    }
    if (answer_correct === 'H') {
      document.getElementById('row_H').style.backgroundColor = 'green';
    }
    if (answer_correct === 'I') {
      document.getElementById('row_I').style.backgroundColor = 'green';
    }
    if (answer_correct === 'J') {
      document.getElementById('row_J').style.backgroundColor = 'green';
    }
    if (answer_correct === 'K') {
      document.getElementById('row_K').style.backgroundColor = 'green';
    }
  }

  notifyIfCorrect(bool) { // chọn câu trả lời đúng nếu sai

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!bool) {
          return reject();
        }

        return resolve();
      }, 1000);
    });
  }

  chooseA() {
    const a: any = document.getElementById('ans_a');
    a.checked = true;
    this.answer_correct = 'A';
  }

  chooseB() {
    const b: any = document.getElementById('ans_b');
    b.checked = true;

    this.answer_correct = 'B';
  }

  chooseC() {
    const c: any = document.getElementById('ans_c');
    c.checked = true;
    this.answer_correct = 'C';
  }

  chooseD() {
    const d: any = document.getElementById('ans_d');
    d.checked = true;
    this.answer_correct = 'D';
  }

  chooseE() {
    const e: any = document.getElementById('ans_e');
    e.checked = true;
    this.answer_correct = 'E';
  }

  chooseF() {
    const f: any = document.getElementById('ans_f');
    f.checked = true;
    this.answer_correct = 'F';
  }

  chooseG() {
    const g: any = document.getElementById('ans_g');
    g.checked = true;
    this.answer_correct = 'G';
  }

  chooseH() {
    const h: any = document.getElementById('ans_h');
    h.checked = true;
    this.answer_correct = 'H';
  }

  chooseI() {
    const i: any = document.getElementById('ans_i');
    i.checked = true;
    this.answer_correct = 'I';
  }

  chooseJ() {
    const j: any = document.getElementById('ans_j');
    j.checked = true;
    this.answer_correct = 'J';
  }

  chooseK() {
    const k: any = document.getElementById('ans_k');
    k.checked = true;
    this.answer_correct = 'k';
  }


  removeSelectAnswer() {
    const a: any = document.getElementById('ans_a');
    a.checked = false;
    const b: any = document.getElementById('ans_b');
    b.checked = false;
    const c: any = document.getElementById('ans_c');
    c.checked = false;
    const d: any = document.getElementById('ans_d');
    d.checked = false;
    const e: any = document.getElementById('ans_e');
    if (e !== null) {
      e.checked = false;
    }
    const f: any = document.getElementById('ans_f');
    if (f !== null) {
      f.checked = false;
    }
    const g: any = document.getElementById('ans_g');
    if (g !== null) {
      g.checked = false;
    }
    const h: any = document.getElementById('ans_h');
    if (h !== null) {
      h.checked = false;
    }
    const i: any = document.getElementById('ans_i');
    if (i !== null) {
      i.checked = false;
    }
    const j: any = document.getElementById('ans_j');
    if (j !== null) {
      j.checked = false;
    }
    const k: any = document.getElementById('ans_k');
    if (k !== null) {
      k.checked = false;
    }
  }

  removeHighlightAnswerIncorrect() {
    const a: any = document.getElementById('row_A');
    if (a !== null) {
      a.style.backgroundColor = '';
    }

    const b: any = document.getElementById('row_B');
    if (b !== null) {
      b.style.backgroundColor = '';
    }

    const c: any = document.getElementById('row_C');
    if (c !== null) {
      c.style.backgroundColor = '';
    }
    const d: any = document.getElementById('row_D');
    if (d !== null) {
      d.style.backgroundColor = '';
    }

    const e: any = document.getElementById('row_E');
    if (e !== null) {
      e.style.backgroundColor = '';
    }

    const f: any = document.getElementById('row_F');
    if (f !== null) {
      f.style.backgroundColor = '';
    }

    const g: any = document.getElementById('row_G');
    if (g !== null) {
      g.style.backgroundColor = '';
    }

    const h: any = document.getElementById('row_H');
    if (h !== null) {
      h.style.backgroundColor = '';
    }

    const i: any = document.getElementById('row_I');
    if (i !== null) {
      i.style.backgroundColor = '';
    }

    const j: any = document.getElementById('row_J');
    if (j !== null) {
      j.style.backgroundColor = '';
    }

    const k: any = document.getElementById('row_K');
    if (k !== null) {
      k.style.backgroundColor = '';
    }

  }

  goToAnotherExamination() {
    window.location.href = '/';
  }

  private saveScore(questionAvailable) { // hàm save score khi làm sai 1 câu
    if (!questionAvailable) {
      this.examinationS.addNewReportExamination({
        score: this.score,
        time_work: this.time,
        list_examination: this.listExaminationCodeCorrect.join(','),
        code_collection: this.currentCollection
      }, this.token.get()).subscribe(
        res => {
          this.finish = true;
          const strings = res.message.split('.');
          this.msgCheckScore = 'Congratulations, you have answered our entire question. ' + strings[2] + '. ' + strings[3];
          this.win = true;
        },
        error => console.log(error)
      );
    } else {

      this.examinationS.addNewReportExamination({
        score: this.score,
        time_work: this.time,
        list_examination: this.listExaminationCodeCorrect.join(','),
        code_collection: this.currentExamination.code_collection
      }, this.token.get()).subscribe(
        res => {
          console.log(res);
          this.finish = true;
          this.msgCheckScore = res.message;

        },
        error => console.log(error)
      );
    }
  }

  round(s) {
    return Math.floor(s);
  }

  restart(applike) {
    this.start = true;
    this.end = false;
    this.finish = false;
    this.win = false;
    this.time = 0;
    this.score = 0;
    this.removeHighlightAnswerIncorrect();
    this.removeSelectAnswer();

    this.jwt.me(this.token.get()).subscribe(
      resMe => {
        this.yourScore = resMe.score;
        this.examinationS.getExaminationByCollection(this.currentCollection).subscribe(
          res => {
            res.examinations.forEach(v => {
              this.listExamination.push(new Examination(v));
            });
            this.currentCollection = this.listCollection[0].code_collection;
            this.currentExamination = this.getRandomExamination(null);
            this.editor.setOption('readOnly', 'cursor');
            this.editor.setValue(this.currentExamination.question);
            if (this.start) {
              this.timer = setInterval(() => this.time++, 1000);
            }
            applike.changeCodeObject(this.currentExamination.code_examination);

          },
          error => {
          }
        );
      }
    );


  }
}
