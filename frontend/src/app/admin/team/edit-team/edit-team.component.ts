import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TeamServiceService} from '../team-service.service';
import {Teams} from '../../../models/teams';
import {TokenService} from '../../../services/token.service';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit {

  code_team: string;
  name: string;
  information: string;
  team_location: string;
  teacher: string;

  errorMsg: any;
  listLocation = [
    {code: 'vn', name: 'Vietnam'},
    {code: 'en', name: 'English'},
    {code: 'jp', name: 'Japan'}
  ];

  constructor(
    private router: ActivatedRoute,
    private teamS: TeamServiceService,
    private token: TokenService
  ) {
  }

  ngOnInit() {
    this.router.paramMap.subscribe(value => {
      const code_team = value.get('team');
      this.teamS.getTeam(code_team).subscribe(
        result => {
          const res = result.team;
          this.code_team = res.code_team;
          this.name = res.name;
          this.information = res.information;
          this.team_location = res.location;
          this.teacher = res.teacher;
          console.log(res);
        },
        error => {

        }
      );
    });
  }


  editTeam(formAddTeam) {
    console.log(formAddTeam);
    const team = formAddTeam.value;
    this.teamS.editTeam(this.token.get(), {
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
