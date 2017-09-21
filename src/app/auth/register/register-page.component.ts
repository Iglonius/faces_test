import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {AuthService} from "../services/auth.service";
import {Register} from "ts-node/dist";

/**
 * Page component which contains the registration process of a user.
 */
@Component({
  selector: 'hiq-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  error: string;
  windowWidth: number;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.windowWidth = window.innerWidth;
  }

  onRegisterUser(event, email, password, confirmPassword) {
    event.preventDefault();

    let isConfirmed = password == confirmPassword;
    let isValidEmail = email.endsWith('@hiq.se');

    if(!isConfirmed) {
      this.error = "Lösenordet stämmer inte överens."
    } else if(!isValidEmail) {
      this.error = "Inte en godkänd email.";
    }
    else {
      this.authService.createNewUser(email, password)
        .then(() => { this.onReturn(event) })
        .catch((error) => this.error = error.message);
    }
  }

  onReturn(event) {
    this.router.navigate(['login'])
  }

  onWindowResize() {
    this.windowWidth = window.innerWidth;
  }

}
