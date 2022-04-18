import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IArticle} from "../../models/article";
import {UserService} from "../../services/user.service";
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'app-article-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  isCreatedFormVisible : boolean = false
  editMode : boolean = false
  articles : Observable<IArticle[]>
  columnNumber = 1
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
      let article : IArticle = {
        uid: this.userService.user.getValue().uid,
        img: this.articleForm.get('img_url')!.value,
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
      this.columnNumber = 2
      this.isCreatedFormVisible = true
      return
    }
    this.columnNumber = 1
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
