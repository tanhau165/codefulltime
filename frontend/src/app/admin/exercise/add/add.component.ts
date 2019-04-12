import {Component, OnInit} from '@angular/core';
import {TeamServiceService} from '../../team/team-service.service';
import {CollectionsService} from '../../collection/collections.service';
import {ConfigService} from '../../../services/config.service';
import {ExamminationServiceService} from '../../examination/exammination-service.service';
import {TokenService} from '../../../services/token.service';
import {AuthService} from '../../../services/auth.service';
import {ExerciseService} from '../exercise.service';
import {Exercises} from '../../../models/exercises';

declare var CodeMirror: any;

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  listTeam: any;
  editor: any;
  errMsg: any;

  constructor(private teamS: TeamServiceService, private  collectionS: CollectionsService,
              private config: ConfigService, private examinationS: ExamminationServiceService,
              private token: TokenService, private auth: AuthService, private exerciseS: ExerciseService
  ) {
  }

  ngOnInit() {
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

  addExercise(formAddExercise) {
    const exercise = new Exercises(formAddExercise.value, this.editor.getValue());
    console.log(this.editor.getValue());
    this.exerciseS.addExercise(exercise, this.token.get()).subscribe(
      res => console.log(res),
      error => {
      }
    );
  }
}
