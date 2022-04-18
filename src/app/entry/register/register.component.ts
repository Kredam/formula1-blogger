import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IUser} from "../../models/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private userService : UserService) {
  }

  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
  }

  sendTestData(){
    const item: IUser = {
      displayName: this.userForm.get("name")!.value,
      password: this.userForm.get("password")!.value,
      email: this.userForm.get("email")!.value
    }
    this.userService.register(item)
    return 0
  }
}
