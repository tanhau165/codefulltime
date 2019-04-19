export class Keyword {

  public key_word: string;
  public times_search: number;

  constructor(k) {
    this.key_word = k.key_word;
    this.times_search = parseInt(k.times_search, 10);
  }

}
