import { Component } from '@angular/core';
import {UserService} from "./services/user.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {ProfileSheetComponent} from "./profile/profile.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'formula1-blogger';

  constructor(public userService : UserService, private _bottomSheet: MatBottomSheet) {}

  openBottomProfileSheet(){
    this._bottomSheet.open(ProfileSheetComponent)
  }

  ngOnInit(): void {

  }

  logout() {
   this.userService.signout()
  }

}
