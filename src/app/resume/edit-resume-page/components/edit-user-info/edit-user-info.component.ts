import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IUserProfile, UserProfile} from "../../../../models/userProfile";
import {UserService} from "../../../../services/user.service";
import {Observable} from "rxjs/Observable";
import {FirebaseAuthService} from "../../../../../firebase/services/firebase-auth.service";
import {AuthService} from "../../../../auth/services/auth.service";


@Component({
  selector: 'hiq-edit-user-info',
  templateUrl: './edit-user-info.component.html',
  styleUrls: ['./edit-user-info.component.scss']
})
export class EditUserInfoComponent implements OnInit {

  user: Observable<IUserProfile>;
  uid: string;
  saveButton: string;
  savingInfo: boolean;

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit() {
    this.authService.User.subscribe((authUser) => {
      if(authUser != null) {
        this.user = this.userService.getUserProfile(authUser.uid);
        this.uid = authUser.uid;
      }
    });
    this.saveButton = "Spara";
    this.savingInfo = false;
  }

  onSaveUser(event, firstname, lastname, bio) {
    event.preventDefault();

    let email = "";
    this.savingInfo = true;
    this.saveButton = "Sparar ...";
    this.user.subscribe(info => email = info.email);

    this.userService.saveUserProfile({firstname: firstname, lastname: lastname, bio: bio.trim(), email: email})
      .then((success) => {
          this.savingInfo = false;
          this.saveButton = "Spara";
    }).catch(error => console.error(error.message));
  }
}
