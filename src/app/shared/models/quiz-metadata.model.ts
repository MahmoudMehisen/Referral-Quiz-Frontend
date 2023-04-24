export class QuizMetadata {
  constructor(public id: number, public numberOfQuestions: number, public referralExpirationTime:number,public canUserDoReferral:boolean) {
  }
}
