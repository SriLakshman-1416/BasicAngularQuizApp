import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  @ViewChild('Username') nameKey !: ElementRef; 
  constructor() { }

  ngOnInit(): void {
  }

  startQuiz(){
    //Here We used local storage , when user give username and hit Start botton name show to question page.
    localStorage.setItem("Username",this.nameKey.nativeElement.value);
  }
}
