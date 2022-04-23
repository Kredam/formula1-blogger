import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ArticleService } from '../services/article.service';
import {IArticle} from "../models/article";
import {empty, Observable} from "rxjs";
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  animations:[
    trigger('onEnter', [
      transition(':enter', [
        style({opacity:0}),
        animate('1s ease-in-out'),
        style({opacity:1}),
      ])
    ]),
  ]
})
export class ArticleComponent implements OnInit {
  @Input() userOnly : boolean = false
  @Input() deleteArticle : Function | undefined;
  @Output() editArticleEvent : EventEmitter<any> = new EventEmitter<any>()

  callEditArticle(eventTarget: EventTarget){
    this.editArticleEvent.emit((eventTarget as Element).id);
  }

  articles : Observable<IArticle[]> = empty()

  constructor(private articleService: ArticleService) {

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
    if(this.userOnly){
      this.articles = this.articleService.retrieveUserArticles();
    }else{
      this.articles = this.articleService.retrieveAllArticles()
    }
  }

}
