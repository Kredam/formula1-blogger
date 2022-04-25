import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import {BehaviorSubject, Observable, take, pipe} from "rxjs";
import { IArticle } from "../models/article";
import { AngularFirestore} from "@angular/fire/compat/firestore";
import { Router } from '@angular/router';
import {IComment} from "../models/comment";


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private article: BehaviorSubject<IArticle>

  public collRef : any;

  constructor(private _store: AngularFirestore, private userService: UserService, private router: Router) {
    this.article = new BehaviorSubject<IArticle>({
      displayName: this.userService.user.getValue().displayName,
      name: '',
      description: '',
      content: '',
    })
  }

  retrieveUserArticles() : Observable<IArticle[]>{
   return this._store.collection<IArticle>("Articles", items => items.where('displayName', '==', this.userService.user.getValue()?.displayName)).valueChanges()
  }

  deleteArticle(articleName : string) : void{
    this._store.collection<IArticle>("Articles", item => item.where('displayName', '==', this.userService.user.getValue()?.displayName)).doc(articleName).delete()
  }

  postArticle(articleData : IArticle) : void {
    console.log(articleData)
    this._store.collection('Articles').doc(articleData.name).set({
      name: articleData.name,
      displayName: articleData.displayName!,
      img: articleData.img!,
      description: articleData.description,
      content: articleData.content
    })
  }

  postComment(comment : IComment, docName: string){
    this._store.collection('Articles').doc(docName).collection('Comments').add(comment)
  }

  retrieveComments(articleName : string) : Observable<IComment[]> {
    return this._store.collection("Articles").doc(articleName).collection<IComment>("Comments").valueChanges()
  }
  retrieveAllArticles() : Observable<IArticle[]>{
      return this._store.collection<IArticle>('Articles').valueChanges()
  }
}
