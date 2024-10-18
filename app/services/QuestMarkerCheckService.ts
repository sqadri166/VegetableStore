
import {db} from '../../Firebase';
import { NativeModules, Platform } from 'react-native';


import { collection, getDocs } from "firebase/firestore";
import {LangaugeChain}  from '../LanguageChain';

export class QuestionsMarkerCheckService 
{
   public Question!: string;
   public Answer!:string;
   public RepliedAnswer!: string;
   public Affirmative!: string; 




 
// Non AI Returns 


// Fetch filter if PRoduct NAe found 
fetchLanguageChain:any =   async (currentPrompt:any) => {
  
  
  const deviceLanguage =
          Platform.OS === 'ios'
            ? NativeModules.SettingsManager.settings.AppleLocale ||
              NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
            : NativeModules.I18nManager.localeIdentifier;


  
  try {
    // Simulate an asynchronous operation
    await new Promise((resolve) => setTimeout(resolve, 100000));


    
    var data:any = [];
    var newData:any= [];
    var questionsHint= [];


    await getDocs(collection(db, "LangaugeChain"))
    .then((querySnapshot)=>{               
         newData = querySnapshot.docs
            .map((doc) => ({...doc.data(), id:doc.id }));
               // now look for possible tokens in the prompt and match for Questions filter and return                
               // look up for PRoduct Name in the Firestore 
               // 
               console.log(currentPrompt + 'fdfffgg' );
               data  = newData.filter((p: { ProductName: string }) => p.ProductName.toLowerCase().includes(currentPrompt.toLowerCase()) == true );
               // Product Name matched Proceed further  
               if(data.length > 0)
              {

                 return data;

              }
              else 
              {
                // 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
                 questionsHint =  this.fetchQuestionBankData();
                 return questionsHint;
           
              }

               

        });
    return data;
  } catch (err) {
    throw new Error("Something went wrong!");
  }
}


fetchQuestionBankData:any =   async () => {
    try {
      // Simulate an asynchronous operation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      var data:any;
      await getDocs(collection(db, "QuestionHints"))
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