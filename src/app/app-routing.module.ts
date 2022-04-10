import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {EntryComponent} from "./entry/entry.component";
import {AuthGuard} from "./guards/auth.guard";
import { ArticleComponent } from './article/article.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'articles', component: ArticleComponent},
  {path: 'entry', component: EntryComponent, canActivate:[AuthGuard]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
