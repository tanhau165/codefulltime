export class Teams {
  public code_team: string;
  public name: string;
  public information: string;
  public teacher: string;
  public location: string;
  public collection_count: number;
  public collections_name: string[] = [];
  public collections_code: string[] = [];

  constructor(teamResponse: any) {
    this.code_team = teamResponse.code_team;
    this.name = teamResponse.name;
    this.information = teamResponse.information;
    this.teacher = teamResponse.teacher;
    this.location = teamResponse.location;
    this.collection_count = parseInt(teamResponse.collection_count, 10);
    teamResponse.collections_code.forEach(v => this.collections_code.push(v));
    teamResponse.collections_name.forEach(v => this.collections_name.push(v));
  }
}
