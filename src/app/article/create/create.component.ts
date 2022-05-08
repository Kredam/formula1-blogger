import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IArticle} from "../../models/article";
import {UserService} from "../../services/user.service";
import {Observable} from "rxjs";
import {
  trigger,
  state,
  style,
  animate,
  transition, keyframes,
} from '@angular/animations';

@Component({
  selector: 'app-article-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  animations:[
    trigger('popNameIntoField', [
      state('filled', style({
       opacity: 1
      })),
      transition(':enter, * => filled', [
        style({opacity:0}),
        animate('2s')
      ])
    ]),
    trigger('openClose', [
      //camel case for example backgroundColor
      //style function convert to css
      //state to call on transition
      state('open', style({
        opacity: 1,
      })),
      //multiple state transition( 'on => off, off => void' )
      transition(':enter, * => open', [
        style({opacity:0}),
        animate('1s 100ms')
      ])
    ])
  ]
})
export class CreateComponent implements OnInit {
  isCreatedFormVisible : boolean = false
  editMode : boolean = false
  articles : Observable<IArticle[]>
  articleForm: FormGroup;
  selectedArticleId: string | undefined;

  constructor(public userService : UserService, private articleService: ArticleService) {
    this.articleForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('' ),
      content: new FormControl('', Validators.required),
      img_url: new FormControl('')
    })
    this.articleForm.valueChanges.subscribe(console.log)
    this.articles = this.articleService.retrieveUserArticles();
  }

  submitArticle(){
      console.log(this.selectedArticleId)
      let img_field = this.articleForm.get('img_url')?.value
      if(img_field === ""){
        img_field = 'https://crossfitbbros.com/bbros-1/wp-content/uploads/2021/01/no-photo-available.png'
      }
      let article : IArticle = {
        id: this.selectedArticleId,
        uid: this.userService.user.getValue().uid,
        img: img_field,
        title: this.articleForm.get('name')!.value,
        description: this.articleForm.get('description')!.value,
        content: this.articleForm.get('content')!.value,
      }
      this.selectedArticleId = undefined;
      this.articleService.postArticle(article)
      this.enableForm()
  }

  enableForm(){
    this.selectedArticleId = undefined
    this.articleForm.get('name')?.setValue('')
    this.articleForm.get('img_url')?.setValue('')
    this.articleForm.get('description')?.setValue('')
    this.articleForm.get('content')?.setValue('')
    this.articleForm.get('name')?.enable()
  }

  setCreationFormVisible(checked: boolean){
    if(checked){
      this.isCreatedFormVisible = true
      return
    }
    this.isCreatedFormVisible = false
  }

  deleteArticle(eventTarget: EventTarget) {
    let elementId : string = (eventTarget as Element).id
    this.articleService.deleteArticle(elementId)
  }

  ngOnInit(): void {
  }

  fillForm(value: string) {
    this.selectedArticleId = value
    const title = document.getElementById(value)?.getElementsByClassName("mat-card-title")[0].textContent
    const description = document.getElementById(value)?.getElementsByClassName("mat-card-subtitle")[0].textContent
    const img_url = document.getElementById(value)?.querySelector("img")?.getAttribute("src")?.valueOf()
    const content = document.getElementById(value)?.querySelector("p")?.textContent
    console.log(title, description, img_url, content)
    this.articleForm.get('name')?.setValue(title)
    this.articleForm.get('img_url')?.setValue(img_url)
    this.articleForm.get('description')?.setValue(description)
    this.articleForm.get('content')?.setValue(content)
  }

}
