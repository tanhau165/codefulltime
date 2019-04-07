import {Component, OnInit} from '@angular/core';

declare var CodeMirror: any;

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

  code_examination: any;
  question: any;
  code_collection: any;

  constructor() {
  }

  ngOnInit() {
    this.theme = 'dracula';
    this.source = '';
    this.language = 'text/javascript';
    this.editor = CodeMirror.fromTextArea(document.getElementById('code'), {
      lineNumbers: true,
      styleActiveLine: true,
      matchBrackets: true,
      extraKeys: {
        'F11': (cm) => {
          cm.setOption('fullScreen', !cm.getOption('fullScreen'));
        },
        'Esc': (cm) => {
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

}
