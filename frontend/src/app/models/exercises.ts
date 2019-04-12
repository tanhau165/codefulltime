export class Exercises {

  public exercise_code: string;
  public question: string;
  public name: string;
  public time_limit: number;
  public memory_limit: number;
  public input1: string;
  public input2: string;
  public input3: string;
  public input4: string;
  public input5: string;
  public input6: string;
  public input7: string;
  public input8: string;
  public input9: string;
  public input10: string;
  public output1: string;
  public output2: string;
  public output3: string;
  public output4: string;
  public output5: string;
  public output6: string;
  public output7: string;
  public output8: string;
  public output9: string;
  public output10: string;
  public code_team: string;
  public status: number;

  constructor(exer, question) {

    this.exercise_code = exer.exercise_code;
    this.question = question;
    this.name = exer.name;
    this.time_limit = parseInt(exer.time_limit, 10);
    this.memory_limit = parseInt(exer.memory_limit, 10);
    this.input1 = exer.input1;
    this.input2 = exer.input2;
    this.input3 = exer.input3;
    this.input4 = exer.input4;
    this.input5 = exer.input5;
    // this.input6 = exer.input6;
    // this.input7 = exer.input7;
    // this.input8 = exer.input8;
    // this.input9 = exer.input9;
    // this.input10 = exer.input10;
    this.output1 = exer.output1;
    this.output2 = exer.output2;
    this.output3 = exer.output3;
    this.output4 = exer.output4;
    this.output5 = exer.output5;
    // this.output6 = exer.output6;
    // this.output7 = exer.output7;
    // this.output8 = exer.output8;
    // this.output9 = exer.output9;
    // this.output10 = exer.output10;
    this.code_team = exer.code_team;
    this.status = parseInt(exer.status, 10);

  }

}
