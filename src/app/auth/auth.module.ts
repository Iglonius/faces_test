import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from "./services/auth.service";
import {LoginPageComponent} from "./login/login-page.component";
import {RegisterPageComponent} from "./register/register-page.component";
import {LogoutComponent} from "./components/logout/logout.component";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {FirebaseModule} from "../../firebase/firebase.module";
import {VerifyEmailPageComponent} from "./register/verify-email/verify-email-page.component";
import {RouterModule} from "@angular/router";
import {AUTH_ROUTES} from "./auth.routes";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    RouterModule.forRoot(AUTH_ROUTES),
    FirebaseModule
  ],
  declarations: [
    LoginPageComponent,
    RegisterPageComponent,
    LogoutComponent,
    VerifyEmailPageComponent
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
