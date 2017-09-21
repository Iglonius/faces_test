import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import * as firebase from "firebase/app";
import {AuthService} from "./auth/services/auth.service";


/**
 * Bootstrap application component.
 * The start point of the whole application.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user: Observable<firebase.User>;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.User.subscribe((user) => {
      if(user == null || !user.emailVerified) {
        this.authService.LoginStatus.next(false);
        this.router.navigate(['login']);
      } else {
        this.authService.LoginStatus.next(true);
        this.router.navigate(['']);
      }
    });
  }

  ngOnInit(): void { }

}
