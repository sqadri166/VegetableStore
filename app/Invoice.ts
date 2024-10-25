
export interface Invoice 
{
    orderNumber:Number ,
    InvoiceID:Number ,
    InvoiceDateTime:Date
    InvoicesOrders:Orders[] 

}

export interface Orders 
{
   OrderStatus:String ,
   ProductID:Number ,
   VendorID:Number ,
   OrderDate:Date


}