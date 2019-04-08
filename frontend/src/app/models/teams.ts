export class Teams {
  public code_team: string;
  public name: string;
  public information: string;
  public teacher: string;
  public location: string;

  constructor(teamResponse: any) {
    this.code_team = teamResponse.code_team;
    this.name = teamResponse.name;
    this.information = teamResponse.information;
    this.teacher = teamResponse.teacher;
    this.location = teamResponse.location;
  }

}
