import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {ArticleService} from "../services/article.service";
import {IArticle} from "../models/article";
import {BehaviorSubject, empty, Observable} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IComment} from "../models/comment";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../article/article.component.scss']
})
export class HomeComponent implements OnInit {

  selectedArticle : string = ''
  articles : Observable<IArticle[]>;
  comments : Observable<IComment[]> = empty()
  comment : FormGroup;

  constructor(public userService:UserService, public articleService : ArticleService) {
    this.articles = this.articleService.retrieveAllArticles()
    this.comment = new FormGroup({
      content: new FormControl('', Validators.required)
    })
  }


  submitComment(documentName : string){
    let item : IComment = {
      uid : this.userService.user.getValue().uid!,
      content: this.comment.get('content')!.value
    }
    this.articleService.postComment(item, documentName)
  }

  ngOnInit(): void {
  }

  obtainArticleName(target: EventTarget) {
    let article_name = (target as Element).id
    this.submitComment(article_name)
  }

  showComments(target: EventTarget) {
    let name = (target as Element).id
    this.selectedArticle = name
    console.log(name)
    this.comments = this.articleService.retrieveComments(name)

  }
}
