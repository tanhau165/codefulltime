import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ExerciseService} from '../../admin/exercise/exercise.service';
import {ConfigService} from '../../services/config.service';
import {SubmissionService} from '../../submit/submission.service';
import {TokenService} from '../../services/token.service';
import {JudgeOutput} from '../../models/judge-output';
import {AuthService} from '../../services/auth.service';

declare var CodeMirror: any;
declare var $: any;

@Component({
  selector: 'app-exercise-submit',
  templateUrl: './exercise-submit.component.html',
  styleUrls: ['./exercise-submit.component.css']
})
export class ExerciseSubmitComponent implements OnInit {

  // data for send to submission
  exercise_code: string;
  time_limit: number;
  memory_limit: number;
  score = 0;
  source: string;
  language: string;
  listData: any[] = [];
  outputs: JudgeOutput[] = [];

  exercise: any;
  theme: string;
  editor: any;
  listLanguage: any;
  clickedSendSolution = false;


  constructor(
    private router: ActivatedRoute,
    private exerS: ExerciseService,
    private config: ConfigService,
    private smS: SubmissionService,
    private token: TokenService,
    private auth: AuthService
  ) {
  }

  ngOnInit() {
    this.auth.changeMenuActive('Exercise');
    this.listLanguage = this.config.listLanguageSumbitable;
    this.router.paramMap.subscribe(value => {
      this.exercise_code = value.get('exercise');
      this.exerS.get(this.exercise_code).subscribe(
        res => {
          this.exercise = res.exercise;
        }
      );
    });
    this.theme = 'dracula';
    this.source = '';
    this.language = 'text/x-java';
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

  async sendSolution() {
    this.clickedSendSolution = true;
    $('#output').empty();
    const idLang = this.getLanguageCode(this.language);
    const source = this.editor.getValue();
    for (const std of this.getListStd()) {
      this.listData.push(this.generateDataSendToAPI(std.stdIn, source, idLang, std.expectedOutput));
    }


    this.smS.sendToAPICheckScore(this.listData[0]).subscribe(res1 => {
      const output1 = new JudgeOutput(res1);
      this.outputs.push(output1);
      this.smS.sendToAPICheckScore(this.listData[1]).subscribe(res2 => {
        const output2 = new JudgeOutput(res2);
        this.outputs.push(output2);
        this.smS.sendToAPICheckScore(this.listData[2]).subscribe(res3 => {
          const output3 = new JudgeOutput(res3);
          this.outputs.push(output3);
          this.smS.sendToAPICheckScore(this.listData[3]).subscribe(res4 => {
            const output4 = new JudgeOutput(res4);
            this.outputs.push(output4);
            this.smS.sendToAPICheckScore(this.listData[4]).subscribe(res5 => {
              const output5 = new JudgeOutput(res5);
              this.outputs.push(output5);
              this.clickedSendSolution = false;
              this.parseDataToView(this.outputs, this.getListStd()).forEach(v => {
                if (v.status) {
                  $('#output').append('<div class="alert alert-success" role="alert">' + v.text + '</div>');
                } else {
                  $('#output').append('<div class="alert alert-danger" role="alert">' + v.text + '</div>');
                }
              });

              this.sendAddToSubmission({
                exercise_code: this.exercise.exercise_code,
                score: this.score,
                source_code: source,
                language_of_source: this.language
              });
            });
          });
        });
      });
    });
  }

  parseDataToView(outputs: JudgeOutput[], stds) {
    const htmls = [];
    for (let i = 0; i < 5; i++) {
      const outputAPI = outputs[i];
      const outputDB = stds[i];
      let right = false;
      let timeOk = false;
      let memoryOk = false;
      let html = '';
      let okAll = false;

      if (outputAPI.stdout.trim() === outputDB.expectedOutput.trim()) {
        right = true;
      }
      if (outputAPI.time <= this.exercise.time_limit) {
        timeOk = true;
      }
      if (outputAPI.memory <= this.exercise.memory_limit * 1024) {
        memoryOk = true;
      }
      if (right) {
        html += 'Output  right. ';
      } else {
        html += 'Output  wrong. ';
      }

      if (timeOk) {
        html += `Accept time (${outputAPI.time}). `;
      } else {
        html += `Time limited (${outputAPI.time}). `;
      }
      if (memoryOk) {
        html += `Accept memory (${outputAPI.memory}). `;
      } else {
        html += `Memory limited (${outputAPI.memory}). `;
      }
      if (timeOk && memoryOk && right) {
        this.score += 1;
        okAll = true;
      }
      htmls.push({text: html, status: okAll});
    }
    return htmls;
  }

  generateDataSendToAPI(stdIn, source, idLang, expectedOutput) {
    return {
      source_code: source,
      language_id: idLang,
      number_of_runs: '1',
      stdin: stdIn,
      expected_output: expectedOutput,
      cpu_time_limit: '1',
      cpu_extra_time: '0.5',
      wall_time_limit: '20',
      memory_limit: '128000',
      stack_limit: '64000',
      max_processes_and_or_threads: '30',
      enable_per_process_and_thread_time_limit: false,
      enable_per_process_and_thread_memory_limit: true,
      max_file_size: '1024'
    };
  }

  getListStd() {
    return [
      {stdIn: this.exercise.input1, expectedOutput: this.exercise.output1},
      {stdIn: this.exercise.input2, expectedOutput: this.exercise.output2},
      {stdIn: this.exercise.input3, expectedOutput: this.exercise.output3},
      {stdIn: this.exercise.input4, expectedOutput: this.exercise.output4},
      {stdIn: this.exercise.input5, expectedOutput: this.exercise.output5}
    ];
  }

  sendAddToSubmission(data) {
    console.log(data);
    this.smS.add(data, this.token.get()).subscribe(
      res => {
        $('#output').append('<div class="alert alert-success" role="alert">' +
          '<h4 class="alert-heading">Congratulation !</h4>' +
          '<hr>' +
          '<p class="mb-0">' + res.message + '</p>' +
          '</div>');
      }
    );
  }

  getLanguageCode($lang) {
    const ds = {
      'text/x-c++src': 10,
      'text/x-java': 27,
      'text/x-python': 34,
      'text/javascript': 29,
      'text/x-ruby': 38
    };
    return ds[$lang];
  }
}
