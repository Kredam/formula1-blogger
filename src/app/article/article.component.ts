import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ArticleService } from '../services/article.service';
import {IArticle} from "../models/article";
import {empty, map, Observable} from "rxjs";
import { animate, style, transition, trigger } from '@angular/animations';
import {UserService} from "../services/user.service";
import {IUser} from "../models/user";

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

  articles : Array<{data:IArticle, user:Observable<IUser | undefined>}> = []

  callEditArticle(eventTarget: EventTarget){
    this.editArticleEvent.emit((eventTarget as Element).id);
  }

  constructor(private articleService: ArticleService, private userService: UserService) {}



  ngOnInit(): void {
    if(this.userOnly){
      this.articleService.retrieveUserArticles().subscribe(event =>{
        this.articles = []
        for (let i = 0; i < event.length; i++) {
          this.articles.push({data: event[i], user:this.userService.getUserDataById(event[i].uid!)})
        }
      })
    }else{
      this.articleService.retrieveAllArticles().subscribe(event =>{
        this.articles = []
        for (let i = 0; i < event.length; i++) {
          this.articles.push({data: event[i], user:this.userService.getUserDataById(event[i].uid!)})
        }
      })
    }
  }

}
