export class Search {

  public examinations: any[] = [];
  public exercises: any[] = [];
  public news_feeds: any[] = [];
  public medias: any[] = [];

  constructor(res) {
    res.examinations.forEach(v => this.examinations.push(v));
    res.exercises.forEach(v => this.exercises.push(v));
    res.news_feeds.forEach(v => this.news_feeds.push(v));
    res.medias.forEach(v => this.medias.push(v));
  }
}
