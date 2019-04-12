export class JudgeOutput {
  public stdout: string;
  public time: number;
  public memory: number;

  constructor(obj) {
    this.stdout = obj.stdout;
    this.time = parseFloat(obj.time);
    this.memory = parseFloat(obj.memory);
  }
}
