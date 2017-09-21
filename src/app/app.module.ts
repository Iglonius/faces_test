import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

// Connection to Firebase
import { FirebaseModule } from "../firebase/firebase.module";

import { AppComponent } from './app.component';

import {UserService} from "./services/user.service";

import { ROUTES } from "./app.routes";
import { AuthGuard } from "./auth.guard";
import { NavbarComponent } from './navbar/navbar.component';
import { FacesModule } from "./faces/faces.module";
import { ResumeModule } from "./resume/resume.module";
import { AuthModule } from "./auth/auth.module";
import {UtilsService} from "./services/utils.service";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    FirebaseModule,
    FacesModule,
    ResumeModule,
    AuthModule
  ],
  providers: [
    UserService,
    UtilsService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
