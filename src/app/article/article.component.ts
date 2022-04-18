import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ArticleService } from '../services/article.service';
import {IArticle} from "../models/article";
import {Observable} from "rxjs";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  @Input() userOnly : boolean = false
  @Input() deleteArticle : Function | undefined;
  @Output() editArticleEvent : EventEmitter<any> = new EventEmitter<any>()

  callEditArticle(eventTarget: EventTarget){
    this.editArticleEvent.emit((eventTarget as Element).id);
  }

  articles : Observable<IArticle[]>

  constructor(private articleService: ArticleService) {
    if(this.userOnly){
      this.articles = this.articleService.retrieveUserArticles();
    }else{
      this.articles = this.articleService.retrieveAllArticles()
    }
  }
  //a way you can access an observable value
  //2nd way is the above BehaviorSubject(has value observable no value)
  async testObservable(){
    let event2 : string
    this.articleService.retrieveUserArticles().subscribe(event => {
      for (let i = 0; i < event.length; i++) {
        console.log(event[i].content)
      }
    })
  }

  ngOnInit(): void {
  }

}
