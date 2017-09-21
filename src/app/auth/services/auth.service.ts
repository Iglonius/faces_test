import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import * as firebase from "firebase/app";
import {FirebaseAuthService} from "../../../firebase/services/firebase-auth.service";
import {UserReferenceService} from "../../../firebase/services/user-reference.service";

@Injectable()
export class AuthService {

  /**
   * Quick checkable object to see if a user is logged in.
   * Components and services can subscribe on this object for direct changes.
   * @type {BehaviorSubject}
   */
  public LoginStatus: BehaviorSubject<boolean> = new BehaviorSubject(false);

  /**
   * Holds the current user which is logged in to the system.
   * Components and services can subscribe on this object for direct changes.
   * @type {BehaviorSubject}
   */
  public User: BehaviorSubject<firebase.User> = new BehaviorSubject(null);

  constructor(private authRef: FirebaseAuthService, private dbRef: UserReferenceService)
  {
    this.authRef.getState().subscribe((auth) => {
      if(auth != null && auth.emailVerified) {
        this.LoginStatus.next(true);
        this.User.next(auth);
      }
    });
  }

  /**
   * Logs in the user to the system.
   *
   * @param email - User email as username
   * @param password - User password
   */
  login(email, password) {
    if(email != null && password != null) {
      this.authRef.login(email, password).then((success) => {
        this.authRef.getState().subscribe((auth) => {
          this.LoginStatus.next(true);
          this.User.next(auth);
        });
      }).catch((error) => console.error(error.message));
    }
  }

  /**
   * Logs out the user
   */
  logout() {
    this.authRef.logout();
    this.LoginStatus.next(false);
    this.User.next(null);
  }

  /**
   * Creates a Firebase user and saves the email in under users-collections on Firebase database.
   *
   * @param email - New users mail
   * @param password - New users passord
   * @returns {firebase.Thenable<any>}
   */
  createNewUser(email: string, password: string) {

    //Creates the user authentifiations in Firebase Authentification
    return this.authRef.createUser(email, password)
      .then((auth) => {

        //Saves the users email to user info in Firebase Database
        this.dbRef.saveUserProfile(auth.uid, {email: email});

        //Sends a verification to users email
        auth.sendEmailVerification();

        //Signs out the user and ends the connection.
        this.authRef.logout();
      }).catch(error =>{ throw new Error(error.message) });
  }
}
