import {Component, OnInit} from '@angular/core';
import {TeamServiceService} from '../../team/team-service.service';
import {Collections} from '../../../models/collections';
import {CollectionsService} from '../../collection/collections.service';
import {ConfigService} from '../../../services/config.service';
import {ExamminationServiceService} from '../exammination-service.service';
import {TokenService} from '../../../services/token.service';
import {AuthService} from '../../../services/auth.service';
import {NgForm} from '@angular/forms';

declare var CodeMirror: any;
declare var $: any;

@Component({
  selector: 'app-add-examination',
  templateUrl: './add-examination.component.html',
  styleUrls: ['./add-examination.component.css']
})
export class AddExaminationComponent implements OnInit {

  editor: any;
  source: any;
  language: any;
  theme: any;
  errMsg: string;
  code_examination: any;
  question: any;
  code_collection: any;
  listTeam: any;
  listCollection: Collections[] = [];


  listLanguage = this.config.listLanguage;
  number_of_answer = 4;


  constructor(private teamS: TeamServiceService, private  collectionS: CollectionsService,
              private config: ConfigService, private examinationS: ExamminationServiceService,
              private token: TokenService, private auth: AuthService
  ) {
  }

  ngOnInit() {
    this.auth.changeMenuAdminActive('Examination');
    this.teamS.getAll().subscribe(
      res => {
        this.listTeam = res.teams;
      },
      error => {

      }
    );


    this.theme = 'dracula';
    this.source = '';
    this.language = 'text/javascript';
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

  addNewExamination(formAddExamination: NgForm) {
    const examination = formAddExamination.value;
    examination.question = this.editor.getValue();
    // examination.status = parseInt(examination.status, 10);
    console.log();
    this.examinationS.addNewExamination(this.token.get(), {
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
      answer_e: examination.answer_e,
      answer_f: examination.answer_f,
      answer_g: examination.answer_g,
      answer_h: examination.answer_h,
      answer_i: examination.answer_i,
      answer_j: examination.answer_j,
      answer_k: examination.answer_k,
      answer_correct: examination.answer_correct
    }).subscribe(
      res => {
        this.editor.setValue('');
        if ($('#a')) {
          $('#a').val('');
        }

        if ($('#b')) {
          $('#b').val('');
        }
        if ($('#c')) {
          $('#c').val('');
        }
        if ($('#d')) {
          $('#d').val('');
        }
        if ($('#e')) {
          $('#e').val('');
        }
        if ($('#f')) {
          $('#f').val('');
        }
        if ($('#g')) {
          $('#g').val('');
        }
        if ($('#h')) {
          $('#h').val('');
        }
        if ($('#i')) {
          $('#i').val('');
        }
        if ($('#j')) {
          $('#j').val('');
        }
        if ($('#k')) {
          $('#k').val('');
        }
        $('#explain').val('');
        const controls = formAddExamination.controls;

        if (controls.answer_a) {
          controls.answer_a.setValue('');
        }

        if (controls.answer_b) {
          controls.answer_b.setValue('');
        }

        if (controls.answer_c) {
          controls.answer_c.setValue('');
        }

        if (controls.answer_d) {
          controls.answer_d.setValue('');
        }

        if (controls.answer_e) {
          controls.answer_e.setValue('');
        }
        if (controls.answer_f) {
          controls.answer_f.setValue('');
        }
        if (controls.answer_g) {
          controls.answer_g.setValue('');
        }
        if (controls.answer_h) {
          controls.answer_h.setValue('');
        }
        if (controls.answer_i) {
          controls.answer_i.setValue('');
        }
        if (controls.answer_j) {
          controls.answer_j.setValue('');
        }
        if (controls.answer_k) {
          controls.answer_k.setValue('');
        }
        controls.explain_question.setValue('');
        console.log(formAddExamination.value);
        this.errMsg = res.message;
        setTimeout(() => this.errMsg = '', 2000);
      },
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
