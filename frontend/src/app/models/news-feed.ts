import {Accounts} from './accounts';
import {Media} from './media';

export class NewsFeed {

  public code_news_feeds: string;
  public content_feeds: string;
  public number_of_like: string;
  public time_add: string;
  public account: Accounts;
  public mediaImage: Media[] = [];
  public mediaMine: Media[] = [];
  public isNew: boolean;

  constructor(nf, isNew) {
    this.isNew = isNew;
    this.code_news_feeds = nf.code_news_feeds;
    this.content_feeds = nf.content_feeds;
    this.number_of_like = nf.number_of_like;
    this.time_add = nf.time_add;
    this.account = new Accounts(nf.account);
    nf.medias.forEach(m => {
      if (m.type_media.match('image/*')) {
        this.mediaImage.push(new Media(m));
      } else {
        this.mediaMine.push(new Media(m));
      }
    });
  }
}
