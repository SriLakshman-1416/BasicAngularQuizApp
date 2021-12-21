import { Injectable } from '@angular/core';
import {HttpClient,HttpClientModule} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StaticQestionService {

  constructor(private http : HttpClient) { }

  getQuestionJson(){
    return this.http.get<any>("assets/staticQuestions.json");
  }
}
