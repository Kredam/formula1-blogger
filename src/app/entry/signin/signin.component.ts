import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss', '../entry.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private userService : UserService) {
  }

   userForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email])
  })

  ngOnInit(): void {
  }


  signIn(){
    const item: IUser = {
      password: this.userForm.get("password")!.value,
      email: this.userForm.get("email")!.value
    }
    this.userService.signin(item)
  }

}
