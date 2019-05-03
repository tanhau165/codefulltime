export class Media {

  public code_media: string;
  public type_media: string;
  public link_media: string;
  public size: number;
  public name: string;


  constructor(media) {
    this.code_media = media.code_media;
    this.type_media = media.type_media;
    this.link_media = media.link_media;
    this.name = media.name;
    this.size = !isNaN(media.size) ? parseInt(media.size, 10) : media.size;
  }

  covertToString(): string {
    return JSON.stringify(this);
  }
}
