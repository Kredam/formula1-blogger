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
      id: undefined,
      uid: this.userService.user.getValue().uid,
      title: '',
      description: '',
      content: '',
    })
  }

  retrieveUserArticles() : Observable<IArticle[]>{
   return this._store.collection<IArticle>("Articles", items => items.where('uid', '==', this.userService.user.getValue()?.uid)).valueChanges()
  }

  deleteArticle(articleName : string) : void{
    this._store.collection<IArticle>("Articles", item => item.where('uid', '==', this.userService.user.getValue()?.uid)).doc(articleName).delete()
  }

  editArtcile(articleData : IArticle){
    this._store.collection('Articles').doc(articleData.id).update({
      id: articleData.id,
      title: articleData.title,
      uid: articleData.uid!,
      img: articleData.img!,
      description: articleData.description,
      content: articleData.content
    })
  }


  postArticle(articleData : IArticle) : void {
    if(articleData.id !== undefined){
      this.editArtcile(articleData)
    }else{
      let id = this._store.createId()
      this._store.collection('Articles').doc(id).set({
        id: id,
        title: articleData.title,
        uid: articleData.uid!,
        img: articleData.img!,
        description: articleData.description,
        content: articleData.content
      })
    }
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
