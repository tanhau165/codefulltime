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
  username: string;
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
    this.teamS.getAll().subscribe(
      res => {
        res.teams.forEach((val) => {
          this.listTeam.push(new Teams(val));
        });
      }
    );
    if (this.token.get() !== null) {
      this.jwt.me(this.token.get()).subscribe(
        res => {
          this.yourScore = res.score;
          this.username = res.username;
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

  getStarted(formStarted) {
    const codeCollection = formStarted.value.code_collection;
    this.start = true;
    this.end = false;

    if (this.start) {
      this.timer = setInterval(() => this.time++, 1000);
    }

    this.examinationS.getExaminationByCollection(codeCollection).subscribe(
      res => {
        res.examinations.forEach(v => {
          this.listExamination.push(new Examination(v));
        });
        this.currentCollection = this.listCollection[0].name;
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
        theme: 'dracula'
      }
    );
    this.editor.setOption('readOnly', 'cursor');
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

  check() {

    if (this.currentExamination.answer_correct === this.answer_correct) {
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
    } else {
      // tính điểm lưu database và giải thích câu trả lời
      clearInterval(this.timer);
      this.saveScore(true);
      this.reChooseIfInCorrect();
    }
  }

  reChooseIfInCorrect() { // chọn câu trả lời đúng nếu sai
    const answer_correct = this.currentExamination.answer_correct;
    if (answer_correct === 'A') {
      document.getElementById('row_A').style.backgroundColor = '#00bb00;';
    }
    if (answer_correct === 'B') {
      document.getElementById('row_B').style.backgroundColor = '#00bb00;';
    }
    if (answer_correct === 'C') {
      document.getElementById('row_C').style.backgroundColor = '#00bb00;';
    }
    if (answer_correct === 'D') {
      document.getElementById('row_D').style.backgroundColor = '#00bb00;';
    }
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


  removeSelectAnswer() {
    const a: any = document.getElementById('ans_a');
    a.checked = false;
    const b: any = document.getElementById('ans_b');
    b.checked = false;
    const c: any = document.getElementById('ans_c');
    c.checked = false;
    const d: any = document.getElementById('ans_d');
    d.checked = false;
  }

  removeHighlightAnswerIncorrect() {
    document.getElementById('row_A').style.backgroundColor = '';
    document.getElementById('row_B').style.backgroundColor = '';
    document.getElementById('row_C').style.backgroundColor = '';
    document.getElementById('row_D').style.backgroundColor = '';
  }

  goToAnotherExamination() { // hàm được gọi khi làm sai muốn làm lại. Đây là hàm được xem như là reset tất cả mọi thứ trở về ban đầu và cập nhật luôn cả điểm của account lên giao diện
    this.start = false;
    this.end = true;
    this.finish = false;
    this.win = false;

    this.removeHighlightAnswerIncorrect();
    this.removeSelectAnswer();
    this.currentExamination = null;
    this.answer_correct = '';
    this.listExamination = [];
    this.score = 0;
    this.jwt.me(this.token.get()).subscribe(
      res => this.yourScore = res.score
    );
    this.msgCheckScore = '';
    this.time = 0;
  }

  private saveScore(questionAvailable) { // hàm save score khi làm sai 1 câu
    if (!questionAvailable) {
      this.examinationS.addNewReportExamination({
        score: this.score,
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
        list_examination: this.listExaminationCodeCorrect.join(','),
        code_collection: this.currentExamination.code_collection
      }, this.token.get()).subscribe(
        res => {
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
}
