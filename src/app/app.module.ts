import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { EntryComponent } from './entry/entry.component';
import { SigninComponent } from './entry/signin/signin.component';
import { RegisterComponent } from './entry/register/register.component';
import {  MatFormFieldModule
} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatGridListModule} from "@angular/material/grid-list";
import { HomeComponent } from './home/home.component';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import { ArticleComponent } from './article/article.component';
import { CommentComponent } from './article/comment/comment/comment.component';
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";

@NgModule({
  declarations: [
    AppComponent,
    EntryComponent,
    SigninComponent,
    RegisterComponent,
    HomeComponent,
    ArticleComponent,
    CommentComponent,
  ],
    imports: [
        BrowserModule,
        MatFormFieldModule,
        MatButtonModule,
        MatGridListModule,
        AppRoutingModule,
        FormsModule,
        MatToolbarModule,
        BrowserAnimationsModule,
        AngularFirestoreModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        provideAuth(() => getAuth()),
        MatInputModule,
        MatIconModule,
        MatRadioModule,
        MatCheckboxModule,
        MatCardModule,
        MatListModule,
    ],
  providers: [
    ScreenTrackingService,UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
