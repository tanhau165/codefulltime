export class Accounts {
  public name: string;
  public score: string;
  public cup: any;
  public id: string;
  public avatar: string;
  public location: string;
  public birth_day: string;
  public number_phone: string;
  public address: string;
  public strengths: string;
  public hobby: string;
  public skill: string;
  public project: string;
  public social: string;
  public website: string;
  public work_in_week: string;
  public sex: string;
  public specialize: string;
  public more_information: string;

  constructor(acc) {
    this.name = acc.name;
    this.id = acc.id;
    this.score = acc.score;
    this.cup = acc.cup;
    this.avatar = acc.avatar;
    this.location = acc.location;
    this.birth_day = acc.birth_day;
    this.number_phone = acc.number_phone;
    this.address = acc.address;
    this.strengths = acc.strengths;
    this.hobby = acc.hobby;
    this.skill = acc.skill;
    this.project = acc.project;
    this.social = acc.social;
    this.website = acc.website;
    this.work_in_week = acc.work_in_week;
    this.sex = acc.sex;
    this.specialize = acc.specialize;
    this.more_information = acc.more_information;
  }
}
