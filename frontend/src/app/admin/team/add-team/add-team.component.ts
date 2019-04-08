import {Component, OnInit} from '@angular/core';
import {TeamServiceService} from '../team-service.service';
import {JarwisService} from '../../../services/jarwis.service';
import {TokenService} from '../../../services/token.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  errorMsg: any;
  location: any;
  listLocation = [
    {code: 'vn', name: 'Vietnam'},
    {code: 'en', name: 'English'},
    {code: 'jp', name: 'Japan'}
  ];


  constructor(
    private teamS: TeamServiceService,
    private jwt: JarwisService,
    private token: TokenService
  ) {
  }

  ngOnInit() {
  }

  addNewTeam(formAddTeam) {
    const team = formAddTeam.value;
    this.teamS.addNewTeam(this.token.get(), {
      code_team: team.code_team,
      name: team.name,
      information: team.information,
      location: team.location,
    }).subscribe(
      res => {
        this.errorMsg = res.message;
      },
      error => {
        this.handleError(error);
      }
    );
  }

  handleError(err) {
    this.errorMsg = err.error.error;

  }
}
