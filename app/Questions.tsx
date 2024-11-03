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
   StepID : Number,
   StepQuestionID:Number,
   StepDescription:String,
   StepPassed:Boolean,
   StepPassedCriteria:"/^(Yes|Confirmed|Ok|OK)$"
   NextStep:Step  
}