export class Examination {
  public code_examination: string;
  public question: string;
  public code_collection: string;
  public answer_a: string;
  public answer_b: string;
  public answer_c: string;
  public answer_d: string;
  public answer_correct: string;
  public type_of_language: string;
  public explain_question: string;
  public status: string;

  constructor(examination) {
    this.code_examination = examination.code_examination;
    this.question = examination.question;
    this.code_collection = examination.code_collection;
    this.answer_a = examination.answer_a;
    this.answer_b = examination.answer_b;
    this.answer_c = examination.answer_c;
    this.answer_d = examination.answer_d;
    this.answer_correct = examination.answer_correct;
    this.type_of_language = examination.type_of_language;
    this.explain_question = examination.explain_question;
    this.status = examination.status;
  }
}
