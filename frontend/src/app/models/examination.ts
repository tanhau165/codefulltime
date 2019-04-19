export class Examination {
  public code_examination: string;
  public question: string;
  public code_collection: string;
  public answer_a: string;
  public answer_b: string;
  public answer_c: string;
  public answer_d: string;
  public answer_e: string;
  public answer_f: string;
  public answer_g: string;
  public answer_h: string;
  public answer_i: string;
  public answer_j: string;
  public answer_k: string;
  public answer_correct: string;
  public type_of_language: string;
  public explain_question: string;
  public status: number;

  constructor(examination) {
    this.code_examination = examination.code_examination;
    this.question = examination.question;
    this.code_collection = examination.code_collection;
    this.answer_a = examination.answer_a;
    this.answer_b = examination.answer_b;
    this.answer_c = examination.answer_c;
    this.answer_d = examination.answer_d;
    this.answer_e = examination.answer_e === '' || examination.answer_e === null || examination.answer_e === undefined ? null : examination.answer_e;
    this.answer_f = examination.answer_f === '' || examination.answer_f === null || examination.answer_f === undefined ? null : examination.answer_f;
    this.answer_g = examination.answer_g === '' || examination.answer_g === null || examination.answer_g === undefined ? null : examination.answer_g;
    this.answer_h = examination.answer_h === '' || examination.answer_h === null || examination.answer_h === undefined ? null : examination.answer_h;
    this.answer_i = examination.answer_i === '' || examination.answer_i === null || examination.answer_i === undefined ? null : examination.answer_i;
    this.answer_j = examination.answer_j === '' || examination.answer_j === null || examination.answer_j === undefined ? null : examination.answer_j;
    this.answer_k = examination.answer_k === '' || examination.answer_k === null || examination.answer_k === undefined ? null : examination.answer_k;
    this.answer_correct = examination.answer_correct;
    this.type_of_language = examination.type_of_language;
    this.explain_question = examination.explain_question;
    this.status = parseInt(examination.status, 10);
  }
}
