import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { StaticQestionService } from '../service/static-qestion.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  public getUserName : string ="";
  public questionList : any = [];
  public currentQuestion : number = 0;
  public points : number = 0;
  progress : string ="0";
  correctAnswer : number = 0;
  incorrectAnswer : number = 0;
  interval$ : any;
  counter = 60;
  isQuizCompleted : boolean = false;

  constructor(private questionService : StaticQestionService) { }

  // ngOnInit Perform Like Form Load ...!
  ngOnInit(): void {
    this.getUserName = localStorage.getItem("Username")!;
    this.getAllQuestion();
    this.startCounter();
  }
  //Get Question list From Service
 getAllQuestion(){
     this.questionService.getQuestionJson()
     .subscribe(res=>{
        this.questionList = res.questions;
     })
 }
 // Move On To Next Question
 nextQuestion(){
    this.currentQuestion++;
 }
// Move On To Previous Question
 previousQuestion(){
    this.currentQuestion--;
 }
 // Whenever User Click A Option That Question No and Options Parsed with this method and validate.
 verifyAnswer(currentQno : number,option : any){
   if(currentQno === this.questionList.length)
   { 
       this.isQuizCompleted = true;
       this.stopCounter();
   }

    if(option.correct)
    {
      this.points += 10; 
      this.correctAnswer ++; 
      setTimeout(() => {
        this.currentQuestion ++;
        this.resetCounter();  
        this.getProgreesPercent();        
      }, 1000);              
    }
    else{
      setTimeout(() => {
        this.currentQuestion ++;
        this.incorrectAnswer ++;
        this.resetCounter();  
        this.getProgreesPercent();      
      }, 1000);           
      this.points -=10;
      
    }
 }

 startCounter(){
   this.interval$ = interval(1000)
   .subscribe(result=>{
     this.counter --;
     if(this.counter===0)
     {
        this.currentQuestion ++
        this.counter=60;
        this.points --;
     }
   });
   // Each Question has 1-min totally 10-mis. After 10-mins completed Quiz will be Timeout. Quiz Time Limit Exceeded
   setTimeout(() => {
     this.interval$.unsubscribe();
   }, 600000);

 }

 stopCounter(){
  this.interval$.unsubscribe();
  this.counter = 0;
 }
 resetCounter(){
    this.stopCounter(); // above Created Method
    this.counter = 60 ;
    this.startCounter(); // above Created Method
 }
// When User Click Reset Button This Method Will Fired , And Quiz Reset .
 resetQuiz(){
   this.resetCounter();
   this.getAllQuestion();
   this.currentQuestion = 0;
   this.points = 0;
   this.counter = 60;
   this.progress = "0";
 }

 getProgreesPercent(){
   this.progress = ((this.currentQuestion/this.questionList)*100).toString();
   return this.progress;
 }
}
