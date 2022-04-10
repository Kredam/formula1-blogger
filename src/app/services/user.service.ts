import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from "@angular/fire/firestore";
import { BehaviorSubject, Observable} from "rxjs";
import { IUser } from "../models/user";
import { updateProfile} from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: BehaviorSubject<IUser>

  private readonly userCollection: AngularFirestoreCollection<IUser>;

  constructor(private _store: AngularFirestore, private auth: AngularFireAuth, private router: Router) {
    this.userCollection = this._store.collection<IUser>('Users')

    this.user = new BehaviorSubject<IUser>({
      displayName: "",
      password: "",
      email: "",
      emailVerified: undefined
    })
    this.signin()
  }

  get userColl(){
    return this.userCollection
  }

  register(userdata: IUser) {
    this.auth.createUserWithEmailAndPassword(userdata.email, userdata.password!).then((UserCred) => {
      updateProfile(UserCred.user!, {
        displayName: userdata.displayName,
        photoURL: ''
      })
      this.userCollection.doc(UserCred.user?.uid).set({
        uid: UserCred.user?.uid,
        displayName: userdata.displayName,
        email: UserCred.user?.email!,
        emailVerified: UserCred.user?.emailVerified
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
        localStorage.setItem("uid", user.uid)
        this.user.next(userSubj)
      }else{
        this.user.next({
          uid: '',
          displayName: '',
          email: '',
          emailVerified: undefined
        })
      }
    })
  }

  // getUserDataById(uid:any) : BehaviorSubject<IUser>{
  //   return new BehaviorSubject<IUser>(this.userCollection.doc<IUser>(uid).valueChanges())
  // }

  signout(){
    localStorage.clear()
    this.auth.signOut()
    this.router.navigate(['entry'])
  }
}
