
import {db} from '../../Firebase';
import { collection, getDocs } from "firebase/firestore";

export class QuestionsMarkerCheckService 
{
   public Question!: string;
   public Answer!:string;
   public RepliedAnswer!: string;
   public Affirmative!: string; 


 
// Non AI Returns 

fetchQuestionBankData:any =   async (currentPrompt:any) => {
    try {
      // Simulate an asynchronous operation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      var data:any;
      await getDocs(collection(db, "Questions"))
      .then((querySnapshot)=>{               
          const newData:any = querySnapshot.docs
              .map((doc) => ({...doc.data(), id:doc.id }));
                 // now look for possible tokens in the prompt and match for Questions filter and return                
                 // look up for PRoduct Name in the Firestore 
               
                 data = newData;


          });
      return data;
    } catch (err) {
      throw new Error("Something went wrong!");
    }
  }
  
  

 fetchQuestionsAndAnswers = async (currentPrompt:any) => {

    await getDocs(collection(db, "Questions"))
        .then((querySnapshot)=>{               
            const newData:any = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
                   // now look for possible tokens in the prompt and match for Questions filter and return                
                 return newData;

            })

}
}