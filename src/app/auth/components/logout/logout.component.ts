import { Component, OnInit } from '@angular/core';
import {FirebaseAuthService} from "../../../../firebase/services/firebase-auth.service";
import {Router} from "@angular/router";

/**
 * Logout component logs the user out and navigate to the login page.
 * This component uses for make it possible to route the logout action from navigation bar.
 */
@Component({
  selector: 'hiq-logout',
  templateUrl: './logout.component.html',
  styles: ['']
})
export class LogoutComponent implements OnInit {

  constructor(private authRef: FirebaseAuthService, private router: Router) { }

  ngOnInit() {
    this.authRef.logout();
    this.router.navigate(['login']);
  }
}
