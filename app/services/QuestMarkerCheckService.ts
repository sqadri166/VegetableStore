
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
    await new Promise((resolve) => setTimeout(resolve, 1000));


    
    var data:any = [{}];
    var newData:any= [{}];
    var questionsHint= [{}];


    await getDocs(collection(db, "LangaugeChain"))
    .then((querySnapshot)=>{               
         newData = querySnapshot.docs
            .map((doc) => ({...doc.data(), id:doc.id }));
               // now look for possible tokens in the prompt and match for Questions filter and return                
               // look up for PRoduct Name in the Firestore 
               // 
               data  = newData.filter((p: { ProductName: string }) => p.ProductName.toLowerCase().includes(currentPrompt.toLowerCase()) == true );
               // Product Name matched Proceed further  
               if(data.length > 0)
              {

                 // 

              }
              else 
              {
                 questionsHint =  this.fetchQuestionBankData();
                 return questionsHint;
              //   https://www.google.com/search?client=safari&rls=en&q=React+Native+LAnguage+Culture++translate+text&ie=UTF-8&oe=UTF-8
                 // Load Question Hint
                // Now Fetch Questions Hint what ever defined and ask the vendor 
                // We didnt find Product Match ask for 
                // Insert Questions List 
                // Check langauge Culture of Phone 

                // if(deviceLanguage === "es-ES" || deviceLanguage === "es" )
                // {
                  //  data.append({Question1:"We didnt find the Product you are looking for , Can you you please type or ask again for a valid Product Name" ,  Question2 : "Please provide information about what Product you want to buy for example say things like I want to buy 5 bags of Potatoes or 2 boxes of Tomatoes" })
           
                // }
                // else if(deviceLanguage === "en" || deviceLanguage === "en" )
               //  {
                 //   data.append({Question1:"We didnt find the Product you are looking for , Can you you please type or ask again for a valid Product Name" ,  Question2 : "Please provide information about what Product you want to buy for example say things like I want to buy 5 bags of Potatoes or 2 boxes of Tomatoes" })
               //  }

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