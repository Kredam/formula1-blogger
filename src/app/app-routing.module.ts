import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {EntryComponent} from "./entry/entry.component";
import {AuthGuard} from "./guards/auth.guard";
import { ProfileComponent } from './profile/profile.component';
import { ProfileGuard } from './guards/profile.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'profile', component: ProfileComponent, canActivate:[ProfileGuard]},
  {path: 'entry', component: EntryComponent, canActivate:[AuthGuard]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
