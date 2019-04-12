import {Component, Input, OnInit} from '@angular/core';
import {ReportService} from './report.service';
import {TokenService} from '../services/token.service';

@Component({
  selector: 'app-report-errore',
  templateUrl: './report-errore.component.html',
  styleUrls: ['./report-errore.component.css']
})
export class ReportErroreComponent implements OnInit {
  @Input() code_object: string;
  @Input() name_object: string;
  message: any;

  constructor(
    private rpS: ReportService,
    private token: TokenService
  ) {
  }

  ngOnInit() {

  }

  onSendReport(formError) {
    this.rpS.addReport({
      content_error: formError.value.content_error,
      code_object: this.code_object,
      name_object: this.name_object
    }, this.token.get()).subscribe(
      res => {
        this.message = res.message;
      }
    );
  }

}
