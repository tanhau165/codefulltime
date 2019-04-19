export class Collections {
  public code_collection: string;
  public name: string;
  public code_team: string;
  public status: number;
  public number_of_examination: number;

  constructor(collectionResp) {
    this.code_collection = collectionResp.code_collection;
    this.name = collectionResp.name;
    this.code_team = collectionResp.code_team;
    this.status = collectionResp.status;
    this.number_of_examination = collectionResp.number_of_examination;
  }
}
