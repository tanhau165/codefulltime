import {Component, OnInit} from '@angular/core';
import {Collections} from '../../../models/collections';
import {TeamServiceService} from '../../team/team-service.service';
import {CollectionsService} from '../../collection/collections.service';
import {ConfigService} from '../../../services/config.service';
import {ExamminationServiceService} from '../exammination-service.service';
import {TokenService} from '../../../services/token.service';
import {ActivatedRoute} from '@angular/router';
import {Examination} from '../../../models/examination';
import {AuthService} from '../../../services/auth.service';

declare var CodeMirror: any;

@Component({
  selector: 'app-edit-examination',
  templateUrl: './edit-examination.component.html',
  styleUrls: ['./edit-examination.component.css']
})
export class EditExaminationComponent implements OnInit {

  editor: any;
  source: any;
  language: any;
  theme: any;

  code_examination: string;
  question: string;
  code_collection: string;
  answer_a: string;
  answer_b: string;
  answer_c: string;
  answer_d: string;
  answer_e: string;
  answer_f: string;
  answer_g: string;
  answer_h: string;
  answer_i: string;
  answer_j: string;
  answer_k: string;
  answer_correct: string;
  type_of_language: string;
  explain_question: string;
  status: number;


  listTeam: any;
  listCollection: Collections[] = [];
  listLanguage = this.config.listLanguage;
  private errMsg: string;


  constructor(private teamS: TeamServiceService, private  collectionS: CollectionsService,
              private config: ConfigService, private examinationS: ExamminationServiceService,
              private token: TokenService, private router: ActivatedRoute, private auth: AuthService
  ) {
  }

  ngOnInit() {
    this.auth.changeMenuAdminActive('Examination');
    this.router.paramMap.subscribe(value => {
      this.code_examination = value.get('examination');
      this.examinationS.getOneExamination(this.code_examination).subscribe(
        res => {
          const examination = res.examination;
          this.code_examination = examination.code_examination;
          this.question = examination.question;
          this.code_collection = examination.code_collection;
          this.answer_a = examination.answer_a;
          this.answer_b = examination.answer_b;
          this.answer_c = examination.answer_c;
          this.answer_d = examination.answer_d;
          this.answer_e = examination.answer_e;
          this.answer_f = examination.answer_f;
          this.answer_g = examination.answer_g;
          this.answer_h = examination.answer_h;
          this.answer_i = examination.answer_i;
          this.answer_j = examination.answer_j;
          this.answer_k = examination.answer_k;
          this.answer_correct = examination.answer_correct;
          this.type_of_language = examination.type_of_language;
          this.explain_question = examination.explain_question;
          this.status = examination.status;


          this.theme = 'dracula';
          // this.source = '';
          this.language = this.type_of_language;


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
            mode: {name: `${this.language}`, globalVars: true},
            lineWrapping: true,
            foldGutter: true,
            gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
            theme: `${this.theme}`
          });
          this.editor.setValue(this.question);

        }
      );
    });
    this.teamS.getAll().subscribe(
      res => {
        this.listTeam = res.teams;
      },
      error => {

      }
    );
  }

  selectTheme(input) {
    const theme = input.value;
    this.theme = theme;
    this.editor.setOption('theme', theme);
    location.hash = '#' + theme;
  }

  selectLanguage(language) {
    this.language = language.value;
    this.editor.setOption('mode', {name: language.value, globalVars: true});
  }

  editExamination(formAddExamination) {
    const examination = formAddExamination.value;
    examination.question = this.editor.getValue();
    examination.status = parseInt(examination.status, 10);
    this.examinationS.updateExamination(this.token.get(), {
      code_examination: examination.code_examination,
      question: examination.question,
      code_collection: examination.code_collection,
      type_of_language: examination.type_of_language,
      explain_question: examination.explain_question,
      status: parseInt(examination.status, 10),
      answer_a: examination.answer_a,
      answer_b: examination.answer_b,
      answer_c: examination.answer_c,
      answer_d: examination.answer_d,
      answer_f: examination.answer_f,
      answer_g: examination.answer_g,
      answer_h: examination.answer_h,
      answer_i: examination.answer_i,
      answer_j: examination.answer_j,
      answer_k: examination.answer_k,
      answer_correct: examination.answer_correct
    }).subscribe(
      res => this.errMsg = res.message,
      error => this.errMsg = error.error.error
    );
  }

  changeTeam(value) {
    this.listCollection = [];
    this.collectionS.getCollectionByTeam(value).subscribe(
      res => {
        res.collections.forEach((collection) => {
          this.listCollection.push(new Collections(collection));
        });
      }
    );
  }
}
