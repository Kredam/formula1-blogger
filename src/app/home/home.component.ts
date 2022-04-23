import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {ArticleService} from "../services/article.service";
import {IArticle} from "../models/article";
import {BehaviorSubject, empty, Observable, take} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IComment} from "../models/comment";
import {IUser} from "../models/user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../article/article.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }


}
