import { Component, OnInit } from '@angular/core';
import {FirebaseAuthService} from "../../../firebase/services/firebase-auth.service";
import * as firebase from "firebase/app";
import AuthProvider = firebase.auth.AuthProvider;
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

/**
 * Login page component which handles the login process and make it possible for users navigate to sign up.
 */
@Component({
  selector: 'hiq-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  isVerified: boolean;
  error: string;

  constructor(private authService: AuthService, private router: Router) {
    this.isVerified = true;
  }

  ngOnInit() {
  }

  /**
   * Login event.
   * @param event - Browser event
   * @param email - Input value for email
   * @param password - Input value for password
   */
  onLogin(event, email, password) {
    event.preventDefault();

    this.authService.login(email, password);

    this.authService.User.subscribe((user) => {
      if(user != null && user.emailVerified) {
        this.router.navigate(['']);
      } else if(user != null && !user.emailVerified) {
        this.isVerified = false;
        this.error = "";
      } else {
        setTimeout(function () {
          this.error = "Användaren kunde inte hittas. Antagligen är du inte registrerad eller skrev du in fel lösenord.";
        }, 200);
      }
    });
  }

  /**
   * Sends a new email verification to the user.
   * @param event
   */
  onSendNewVerification(event) {
    event.preventDefault();

    this.authService.User.subscribe((user) => {
      user.sendEmailVerification().then((success) => {
        this.isVerified = true;
        this.error = "Ett verifieringsmail är på G till dig.";
      }).catch((error) => console.error(error));
    });
  }

  /**
   * Navigates to the registration page
   * @param event
   */
  onSignUp(event) {
    this.router.navigate(['register']);
  }
}
