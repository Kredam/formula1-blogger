import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserService } from "../services/user.service";

@Injectable({
  providedIn: 'root'
})
export class SignGuard implements CanActivate {

  constructor(private serviceUser : UserService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!localStorage.getItem('uid')){
      this.router.navigate(['entry'])
    }
    return true;
  }


}
