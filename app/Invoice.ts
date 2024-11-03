import { Double } from "react-native/Libraries/Types/CodegenTypes"

export interface Invoice 
{
     // Random Invoice Generation Number 
    orderNumber:Number ,
    InvoiceID:Number ,
    InvoiceDateTime:Date
    InvoicesOrders:Orders[],
    TotalAmount:Double

}

export interface Orders 
{
   OrderStatus:String ,
   ProductID:Number ,
   VendorID:Number ,
   OrderDate:Date
   OrderAmountPrice:Double


}


export interface Action 
{
    ActionID:Number ,
    // Generate Invoice send email quotes
    ActionName:String ,
    ActionStatus:String 


}

export interface RespondedAnswer
{
    RespondedAnswerCode: Number ,
    RespondedAnswer: String ,
    QuestionAsked: String ,
    Affirmative:String ,
    NextQuestion:String,
    NextRespondedAnswer:String
    ActionDecided:Action
   


}