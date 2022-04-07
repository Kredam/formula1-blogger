import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from "@angular/fire/firestore";
import { BehaviorSubject} from "rxjs";
import { IUser } from "../models/user";
import { updateProfile} from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: BehaviorSubject<IUser> = new BehaviorSubject<IUser>({
    displayName: "",
    password: "",
    email: "",
    emailVerified: undefined
  })

  private readonly collection: AngularFirestoreCollection<IUser>;

  constructor(private _store: AngularFirestore, private auth: AngularFireAuth, private router: Router) {
    this.collection = this._store.collection<IUser>('Users')
    this.signin()
  }

  register(userdata: IUser) {
    this.auth.createUserWithEmailAndPassword(userdata.email, userdata.password!).then((UserCred) => {
      updateProfile(UserCred.user!, {
        displayName: userdata.displayName,
        photoURL: ''
      })
    })
  }
  
  signin(userData?: IUser) {
    if(!localStorage.getItem("uid")){
      this.auth.signInWithEmailAndPassword(userData?.email!, userData?.password!)
      this.router.navigate([''])
    }
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        const userSubj: IUser = {
          uid: user.uid,
          displayName: user?.displayName!,
          email: user?.email!,
          emailVerified: user?.emailVerified
        }
        console.log(user)
        localStorage.setItem("uid", user.uid)
        this.user.next(userSubj)
      }else{
        localStorage.clear()
        this.user.next({
          uid: '',
          displayName: '',
          email: '',
          emailVerified: undefined
        })
      }
    }) 
  }

  signout(){
    this.auth.signOut()
  }
}
