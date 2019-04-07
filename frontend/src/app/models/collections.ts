export class Collections {
  public code_collection: string;
  public name: string;
  public code_team: string;
  public status: number;

  constructor(collectionResp) {
    this.code_collection = collectionResp.code_collection;
    this.name = collectionResp.name;
    this.code_team = collectionResp.code_team;
    this.status = collectionResp.status;
  }
}
