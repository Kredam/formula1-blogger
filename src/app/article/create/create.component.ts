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
      let img_field = this.articleForm.get('img_url')?.value
      if(img_field === ""){
        img_field = 'https://crossfitbbros.com/bbros-1/wp-content/uploads/2021/01/no-photo-available.png'
      }
      let article : IArticle = {
        displayName: this.userService.user.getValue().displayName,
        img: img_field,
        name: this.articleForm.get('name')!.value,
        description: this.articleForm.get('description')!.value,
        content: this.articleForm.get('content')!.value,
      }
      this.articleService.postArticle(article)
      this.enableForm()
  }

  enableForm(){
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


  //a way you can access an observable value
  //2nd way is the above BehaviorSubject(has value observable no value)
  // async testObservable(){
  //   let event2 : string
  //   this.articleService.retrieveUserArticles().subscribe(event => {
  //     for (let i = 0; i < event.length; i++) {
  //       console.log(event[i].content)
  //     }
  //   })
  // }

  deleteArticle(eventTarget: EventTarget) {
    let elementId : string = (eventTarget as Element).id
    this.articleService.deleteArticle(elementId)
  }

  ngOnInit(): void {
  }

  editArticle(value: string) {
    //for form control you need to use this to disable field
    this.articleForm.get('name')?.disable()
    console.log(this.articleForm?.value)
    this.articleForm.get('name')?.setValue(value)
  }

}
