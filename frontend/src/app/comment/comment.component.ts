import {Component, Input, OnInit} from '@angular/core';
import {CommentService} from './comment.service';
import {AuthService} from '../services/auth.service';
import {TokenService} from '../services/token.service';
import {Renderer2} from '@angular/core';


declare let $: any;

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})


export class CommentComponent implements OnInit {
  @Input() codeObject: string;
  @Input() option: any;

  comments: any[] = [];
  isLoggedIn: any;
  str: any;
  view_header = true;
  cmt = '';

  constructor(
    private cmS: CommentService,
    private auth: AuthService,
    private token: TokenService,
    private renderer: Renderer2
  ) {
  }

  ngOnInit() {
    if (this.option !== null && this.option !== undefined) {
      this.view_header = this.option.view_header;
    }

    this.auth.authStatus.subscribe(v => this.isLoggedIn = v);
    this.cmS.getListComment(this.codeObject).subscribe(
      res => {
        res.comments.forEach(v => {
          this.comments.push(v);
        });
        $(document).ready(() => {
          $('[data-toggle="tooltip"]').tooltip();
        });
      },
      error => {

      }
    );

  }


  sendAnsComment(code, ans, e) {
    if (e.ctrlKey && e.keyCode === 13) {
      ans.value = ans.value + '\n';
      $(ans).attr('rows', parseInt($(ans).attr('rows'), 10) + 1);
    } else if (e.keyCode === 13 && ans.value !== '') {
      e.preventDefault();
      const ansT = ans.value;
      ans.value = '';
      $(ans).attr('rows', 1);
      this.cmS.addAnsCommet(code, ansT.replace(/\n/g, '<br/>'), this.token.get()).subscribe(
        res => {
          const a = this.comments.findIndex(c => {
            return c.code_comment === res.ans_comment.code_comment;
          });
          this.comments[a].ans_comments.unshift(res.ans_comment);

          $(document).ready(() => {
            $('[data-toggle="tooltip"]').tooltip();
          });
        }
      );
    }
  }

  sendComment(cmt, e) {
    if (e.ctrlKey && e.keyCode === 13) {
      cmt.value = cmt.value + '\n';
      $(cmt).attr('rows', parseInt($(cmt).attr('rows'), 10) + 1);
    } else if (e.keyCode === 13 && cmt.value !== '') {
      e.preventDefault();
      const ansT = cmt.value;
      cmt.value = '';
      $(cmt).attr('rows', 1);
      this.cmS.addCommet(this.codeObject, ansT.replace(/\n/g, '<br/>'), this.token.get()).subscribe(
        res => {
          this.comments.unshift(res.comment);
          $(document).ready(() => {
            $('[data-toggle="tooltip"]').tooltip();
          });
        }
      );
    }
  }
}
