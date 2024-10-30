import { Double } from "react-native/Libraries/Types/CodegenTypes"

export interface Invoice 
{
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