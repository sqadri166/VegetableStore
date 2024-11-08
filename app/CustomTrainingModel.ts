import { Step } from "./Questions"

import  tf from '@tensorflow/tfjs-node';
import qna from '@tensorflow-models/qna';
import * as FileSystem from 'expo-file-system';


import fs from 'fs';

 export class CustomTrianingModel
 {

      questionFeeds:any = [];
      answers:any = [];
      currentStep:Step | undefined ;
      public StepAnalysisIndex:Number | undefined;

      public async loadModel() {
        const model = await qna.load();

       

       return model;
      }


      
      public LoadJsonFileQuestionSteps:any =   async () => {

        const response =  await FileSystem.readAsStringAsync("./QuestionFeed.json");
            
         const data = JSON.parse(response);

         return Promise.resolve({ success: true, data: data });


      }

     
     public async  answerQuestion(model:any, passage:any, question:any) {
      // Train model to answer questions 

         const answers = await model.findAnswers(question, passage);
         return answers;
       
      }
       
    
    
    // Load Steps  
     public  FetchAndTrainAndAnswer:any = async (step:Step[]) => {
         
         
     
   
      const model = await this.loadModel();
    
      await this.LoadJsonFileQuestionSteps().then((res: any) => {

          for(var i=0 ; i < res.data.length; i++)
          {
            
            const answers =  this.answerQuestion(model, res.data[i].StepQuestionExpected, res.data[i].StepExpectedResponse);
            this.answers.push(answers); 
            
            

          }


         
       }); 

    }

  }



  
