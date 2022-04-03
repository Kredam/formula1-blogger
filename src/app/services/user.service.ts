import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from "@angular/fire/firestore";
import { BehaviorSubject } from "rxjs";
import { IUser } from "../models/user";
import { updateProfile } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user : BehaviorSubject<IUser> = new BehaviorSubject<IUser>({
    displayName: "",
    password: "",
    email: "",
    emailVerified: undefined
  })

  private readonly collection : AngularFirestoreCollection<IUser>;

  constructor(private _store : AngularFirestore, private auth: AngularFireAuth) {
    this.collection = this._store.collection<IUser>('Users')

  }

  register(userdata: IUser){
    this.auth.createUserWithEmailAndPassword(userdata.email, userdata.password!).then((UserCred) => {
      updateProfile(UserCred.user!, {
        displayName: userdata.displayName,
        photoURL: ''
      })
    })
  }

  signin(userData: IUser){
    this.auth.signInWithEmailAndPassword(userData.email, userData.password!).then(userCredentials => {
      this.auth.onAuthStateChanged((user) => {
        if(user){
        const user : IUser = {
          displayName: userCredentials.user?.displayName!,
          email: userCredentials.user?.email!,
          emailVerified: userCredentials.user?.emailVerified
        }
        this.user.next(user)
      }
    })
    })
    console.log(this.auth.currentUser)
  }

}
