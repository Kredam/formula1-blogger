import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from "@angular/fire/firestore";
import { UserService } from './user.service';
import {BehaviorSubject, map, Observable} from "rxjs";
import { IArticle } from "../models/article";
import { AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from '@angular/router';
import {IComment} from "../models/comment";
import {IUser} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private article: BehaviorSubject<IArticle>

  public collRef : any;

  constructor(private _store: AngularFirestore, private userService: UserService, private router: Router) {
    this.article = new BehaviorSubject<IArticle>({
      author: this.userService.user.getValue(),
      name: '',
      description: '',
      content: '',
    })
  }

  retrieveArticles() : Observable<IArticle[]>{
   return this._store.collection<IArticle>("Articles", items => items.where('uid', '==', localStorage.getItem('uid'))).valueChanges()
  }

  deleteArticle(articleName : string) : void{
    this._store.collection<IArticle>("Articles", item => item.where('uid', '==', localStorage.getItem('uid'))).doc(articleName).delete()
  }

  postArticle(articleData : IArticle) : void {
    this._store.collection('Articles').doc(articleData.name).set({
      name: articleData.name,
      uid: articleData.author?.uid!,
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
