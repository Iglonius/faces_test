import { Component, OnInit } from '@angular/core';
import {FirebaseAuthService} from "../../../../firebase/services/firebase-auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserReferenceService} from "../../../../firebase/services/user-reference.service";

@Component({
  selector: 'hiq-verify-email-page',
  templateUrl: './verify-email-page.component.html',
  styleUrls: ['./verify-email-page.component.scss']
})
export class VerifyEmailPageComponent implements OnInit {

  currentUser: any;
  oobCode: string;
  sub: any;

  constructor(private authRef: FirebaseAuthService, private dbRef: UserReferenceService, private route: ActivatedRoute, private router: Router)
  {
  }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
        this.oobCode = params['oobCode'];
    });
  }

  onVerifyEmail() {
    this.authRef.verifyUser(this.oobCode)
      .then(function (data) {
        console.log(this.currentUser.uid);
        this.dbRef.updateVerifyUser(this.currentUser.uid);
      }).catch(function(error) {
        console.error(error.message, error, {timeOut: 0});
    });
  }
}
