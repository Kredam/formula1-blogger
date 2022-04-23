import {Component, Input, OnInit} from '@angular/core';
import {empty, Observable} from "rxjs";
import {IArticle} from "../../models/article";
import {IUser} from "../../models/user";
import {IComment} from "../../models/comment";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {ArticleService} from "../../services/article.service";
import { animate, style, trigger, transition } from '@angular/animations';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  animations: [
    trigger('onEnter', [
      transition(':enter', [
        style({opacity:0}),
        animate('1s ease-in-out'),
        style({opacity:1}),
      ])
    ])
  ]
})
export class CommentsComponent implements OnInit {

  @Input() currentArticle : string | undefined;
  selectedArticle : string = ''
  isCommentsOnDisplay : boolean = false
  comments : Observable<IComment[]> = empty()
  comment : FormGroup;

  constructor(public userService:UserService, public articleService : ArticleService) {
    this.comment = new FormGroup({
      content: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
  }

  submitComment(documentName : string){
    let item : IComment = {
      displayName : this.userService.user.getValue().displayName!,
      content: this.comment.get('content')!.value
    }
    this.articleService.postComment(item, documentName)
  }

  getName(uid: string){
    this.userService.getUserDataById(uid)
  }

  obtainArticleName(target: EventTarget) {
    let article_name = (target as Element).id
    this.submitComment(article_name)
  }

  showComments(target: EventTarget) {
    this.isCommentsOnDisplay = !this.isCommentsOnDisplay
    let name = (target as Element).id
    this.selectedArticle = name
    console.log(name)
    this.comments = this.articleService.retrieveComments(name)

  }
}
