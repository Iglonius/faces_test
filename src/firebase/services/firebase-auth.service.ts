import { Injectable } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

/**
 * This service handles all kind of stuff against Firebase Authentification
 */
@Injectable()
export class FirebaseAuthService {

  constructor(private fbRef: AngularFireAuth) { }

  /**
   * Gets the state of logged in processes.
   * @returns {Observable<firebase.User>} - A Observable on Firebase user to subscribe changes
   */
  getState() {
    return this.fbRef.authState;
  }

  /**
   * Gets the current logged in user
   * @returns {firebase.User|null} - Firebase user to act on.
   */
  getCurrentUser() {
    return this.fbRef.auth.currentUser;
  }

  /**
   * Logs the user in with email credentials
   * @param email - email for login
   * @param password - password for login
   * @returns {firebase.Promise<any>} - Promise to handle when user has logged in.
   */
  login(email:string, password:string) {
    return this.fbRef.auth.signInWithEmailAndPassword(email, password);
  }

  /**
   * Logs the user out from Firebase
   */
  logout() {
    this.fbRef.auth.signOut();
  }

  /**
   * Create a new user with email and password.
   * @param email - user email for identification
   * @param password - user password
   */
  createUser(email: string, password: string) {
    return this.fbRef.auth.createUserWithEmailAndPassword(email, password)
  }

  /**
   * Verifying the oobCode is correct and then applies the user to Firebase
   * @param oobCode - Verification code from Firebase
   */
  verifyUser(oobCode: string) {
    return this.fbRef.auth.applyActionCode(oobCode);
  }

}
