import {Component, OnInit} from '@angular/core';
import {TeamServiceService} from '../../team/team-service.service';
import {CollectionsService} from '../../collection/collections.service';
import {ConfigService} from '../../../services/config.service';
import {ExamminationServiceService} from '../../examination/exammination-service.service';
import {TokenService} from '../../../services/token.service';
import {AuthService} from '../../../services/auth.service';
import {ExerciseService} from '../exercise.service';
import {ActivatedRoute} from '@angular/router';
import {Exercises} from '../../../models/exercises';

declare var CodeMirror: any;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  exercise_code: string;
  name: string;
  time_limit: number;
  memory_limit: number;
  input1: string;
  input2: string;
  input3: string;
  input4: string;
  // input5: string;
  // input6: string;
  // input7: string;
  // input8: string;
  // input9: string;
  // input10: string;
  output1: string;
  output2: string;
  output3: string;
  output4: string;
  output5: string;
  // output6: string;
  // output7: string;
  // output8: string;
  // output9: string;
  // output10: string;
  code_team: string;
  listTeam: any;
  editor: any;
  errMsg: any;

  exercise: Exercises;
  status: number;

  constructor(
    private teamS: TeamServiceService, private  collectionS: CollectionsService,
    private config: ConfigService, private examinationS: ExamminationServiceService,
    private token: TokenService, private auth: AuthService,
    private exerciseS: ExerciseService, private router: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.router.paramMap.subscribe(value => {
      this.exercise_code = value.get('exercise');
      this.exerciseS.get(this.exercise_code).subscribe(
        val => {
          const v = val.exercise;
          this.editor.setValue(v.question);
          this.exercise_code = v.exercise_code;
          this.name = v.name;
          this.time_limit = v.time_limit;
          this.memory_limit = v.memory_limit;
          this.input1 = v.input1;
          this.input2 = v.input2;
          this.input3 = v.input3;
          this.input4 = v.input4;
          // this.input5 = v.input5;
          // this.input6 = v.input6;
          // this.input7 = v.input7;
          // this.input8 = v.input8;
          // this.input9 = v.input9;
          // this.input10 = v.input10;
          this.output1 = v.output1;
          this.output2 = v.output2;
          this.output3 = v.output3;
          this.output4 = v.output4;
          this.output5 = v.output5;
          // this.output6 = v.output6;
          // this.output7 = v.output7;
          // this.output8 = v.output8;
          // this.output9 = v.output9;
          // this.output10 = v.output10;
          this.code_team = v.code_team;
          this.status = v.status;
        },
        error => {

        }
      );
    });

    this.teamS.getOfMe(this.token.get()).subscribe(
      res => {
        this.listTeam = res.teams;
      },
      error => {

      }
    );
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
      mode: {name: 'markdown', globalVars: true},
      lineWrapping: true,
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      theme: 'dracula'
    });
  }


  editExercise() {
    const ex = new Exercises({
      exercise_code: this.exercise_code,
      name: this.name,
      time_limit: this.time_limit,
      memory_limit: this.memory_limit,
      input1: this.input1,
      input2: this.input2,
      input3: this.input3,
      input4: this.input4,
      // input5: this.input5,
      // input6: this.input6,
      // input7: this.input7,
      // input8: this.input8,
      // input9: this.input9,
      // input10: this.input10,
      output1: this.output1,
      output2: this.output2,
      output3: this.output3,
      output4: this.output4,
      output5: this.output5,
      // output6: this.output6,
      // output7: this.output7,
      // output8: this.output8,
      // output9: this.output9,
      // output10: this.output10,
      code_team: this.code_team,
      status: this.status
    }, this.editor.getValue());
    this.exerciseS.editExercise(ex, this.token.get()).subscribe(
      res => console.log(res)
    );
  }
}
