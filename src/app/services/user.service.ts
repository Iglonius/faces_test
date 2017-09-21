import { Injectable } from '@angular/core';
import "rxjs/add/operator/map";
import {Face} from "../models/face";
import {Observable} from "rxjs/Observable";
import {IUserProfile, UserProfile} from "../models/userProfile";
import {Experience} from "../models/experience";
import {UserReferenceService} from "../../firebase/services/user-reference.service";
import * as firebase from "firebase/app";
import UploadTask = firebase.storage.UploadTask;
import {AuthService} from "../auth/services/auth.service";
import {FirebaseStorageService} from "../../firebase/services/firebase-storage.service";


/**
 * User service handles all create/select/update/delete actions for users in Firebase
 */
@Injectable()
export class UserService {

  constructor(private authService: AuthService, private dbRef: UserReferenceService, private storageRef: FirebaseStorageService)
  {
  }

  private isLoggedIn() {
    let isLoggedIn = false;
    this.authService.LoginStatus.subscribe((status) => {isLoggedIn = status });
    return isLoggedIn;
  }

  /**
   * Gets the users faces.
   * @returns {Observable<Face[]>} - An observable array of Faces.
   */
  getUserFaces(): Observable<Face[]>{

    if(this.isLoggedIn()) {
      return this.dbRef.getUsersInfo().map(users => {
        let faces: Face[] = [];
        users.forEach(u => {
          if(u.info) {
            let firstname = u.info.firstname ? u.info.firstname : "";
            let lastname = u.info.lastname ? u.info.lastname : "";
            let fullname = firstname + " " + lastname;

            faces.push(new Face(fullname.trim(), u.info.photoUrl, u.info.email, []));
          }
        });
        return faces;
      });
    }
  }

  /**
   * Gets a specific user profile with by user id
   * @param userId - User id in Firebase to select.
   * @returns Obervable<UserProfile> - User profile object for showing the profile.
   */
  getUserProfile(uid: string): Observable<IUserProfile> {
    if(this.isLoggedIn()) {
      return this.dbRef.getUserProfile(uid);
    }
  }

  /**
   * Gets the experience that the selected user has.
   */
  getUserExperiences(uid: string): Observable<Experience[]> {
    //TODO: Implement the get user experience from Firebase
    if(this.isLoggedIn()) {
      return this.dbRef.getUserExperiences(uid);
    }
  }

  /**
   * Saves or updates the experience for the user
   * @param experience - The expericence to save or update
   */
  saveUserExperience(key: string, experience: Experience): void {
    let userId = this.getUserId();
    this.dbRef.saveUserExperience(userId, key, experience);
  }

  /**
   * Removes the experience from the user
   * @param experience - The expericence to remove
   */
  removeUserExperience(key: string): void {
    this.dbRef.removeUserExperience(this.getUserId(), key);
  }

  /**
   * Saves the user info.
   * @param userId
   * @param profile
   * @returns {firebase.Promise<void>|firebase.Promise<void>}
   */
  saveUserProfile(profile: any) {
    return this.dbRef.saveUserProfile(this.getUserId(), profile);
  }

  /**
   * Gets the user photo url
   * @param userId - User id in Firebase
   * @returns {Observable<string>} - Observable of a string
   */
  getUserPhoto(): Observable<string> {
    return this.dbRef.getUserProfile(this.getUserId()).map((user) => user.photoUrl);
  }

  /**
   * Saves the photo url on users
   * @param userId - Firebase user id
   * @param photoUrl - Photo url in Firebase Storage
   */
  saveUserPhoto(photoUrl: string) {
    let email: string = "";
    let userId: string = "";
    this.authService.User.subscribe((user) => {
      userId = user.uid;
      email = user.email;
    });

    return this.dbRef.saveUserPhoto(userId, photoUrl, email);
  }

  /**
   * Upload file to Firebase storage
   */
  uploadUserPhoto(base64: any, filename: string): UploadTask {
    return this.storageRef.uploadBase64ToStorage(this.getUserId(), '/images', base64, 'image/jpeg', filename);
  }

  getUserId() {
    let userId = "";
    this.authService.User.subscribe((user) => { userId = user.uid});
    return userId;
  }
}
