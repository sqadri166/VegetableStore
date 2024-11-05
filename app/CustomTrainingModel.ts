import { Step } from "./Questions"

import  tf from '@tensorflow/tfjs-node';
import qna from '@tensorflow-models/qna';
import * as FileSystem from 'expo-file-system';


import fs from 'fs';

 export class CustomTrianingModel
 {

      questionFeeds:any = [];
      answers:any = [];
      public async loadModel() {
        const model = await qna.load();

       

       return model;
      }


      public async LoadJsonFileQuestionSteps() {

         
         
         const response =  await FileSystem.readAsStringAsync("./QuestionFeed.json");
            
         const data = JSON.parse(response);

         this.questionFeeds = data ; 
         

      }

     
     public async  answerQuestion(model:any, passage:any, question:any) {
         const answers = await model.findAnswers(question, passage);
         return answers;
       
      }
       
    
    public StepAnalysisIndex:Number | undefined
    
    // Load Steps  


    public  FetchAndTrainAndAnswer:any = async (step:Step[]) => {
         

         const model = await this.loadModel();
         let answer
         this.LoadJsonFileQuestionSteps();
         for(var i=0 ; i < this.questionFeeds.length; i++)
         {
            const answers = await this.answerQuestion(model, this.questionFeeds[i].StepQuestionExpected, this.questionFeeds[i].StepExpectedResponse);
            this.answers = answers; 
            console.log(answers);


         }
         
       }
       

       


    

   


 }