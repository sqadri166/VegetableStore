export interface Questions
{

   Affirmative:String ,
   Answer:String ,
   HumanQuestion:String ,
   Question:String,
   RepliedAnswer:String ,
   QuestionID:Number 
   




}

// Chain Steps
export interface Step 
{
      StepID: String , 
      StepQuestionExpected: String
      StepContext: String
      StepResponse: String ,
      StepQuestionActualResponse:String,
      NoCorrectResponseRepeatStep: String,
      BadResponseReply: String ,
      NextStepIDJumpOnSuccess: String ,
      NextStepIDJumpOnFailure: String ,
      ExpectedGrammarResponseExpression: String 
}