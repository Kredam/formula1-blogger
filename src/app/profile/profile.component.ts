import {Component} from "@angular/core";
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
})
export class ProfileSheetComponent {
  constructor(private _bottomSheetRef: MatBottomSheetRef<ProfileSheetComponent>, public _userService : UserService) {}

}
