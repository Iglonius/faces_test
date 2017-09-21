import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {Schema} from "../firebase-schema";
import {IUserProfile} from "../../app/models/userProfile";
import "firebase/storage";
import {FirebaseApp} from "angularfire2";
import * as firebase from "firebase/app";
import UploadTask = firebase.storage.UploadTask;

/**
 * This service handles all kind of stuff against Firebase Database
 */
@Injectable()
export class UserReferenceService {

  constructor(private dbRef: AngularFireDatabase) { }

  /**
   * Gets all users informations
   * @returns {FirebaseListObservable<any[]>}
   */
  getUsersInfo() {
    return this.dbRef.list(Schema.users());
  }

  /**
   * Gets the user info
   * @param {string} uid - User id to get info of
   * @returns {FirebaseObjectObservable<any>}
   */
  getUserInfo(uid: string) {
    return this.dbRef.object(Schema.user(uid));
  }

  /**
   *
   * @param {string} uid
   * @returns {FirebaseListObservable<any[]>}
   */
  getUserExperiences(uid: string) {
    return this.dbRef.list(Schema.userExperiences(uid));
  }

  /**
   * Saves the experience to Firebase
   * @param {string} uid - User id to connect the experience to.
   * @param experience - Expericense to create or update
   */
  saveUserExperience(uid: string, key: string, experience: any) {
    if(key) {
      this.dbRef.object(Schema.userSingleExperience(uid, key)).set(experience);
    } else {
      this.dbRef.list(Schema.userExperiences(uid)).push(experience);
    }
  }

  /**
   * Removes the experience to Firebase
   * @param {string} uid - User id to connect the experiences to.
   * @param experienceKey - Expericense to remove
   */
  removeUserExperience(uid: string, experienceKey: string) {
    let experciencesRef = this.dbRef.list(Schema.userExperiences(uid));
    if(experienceKey !== null) {
      experciencesRef.remove(experienceKey);
    }
  }



  /**
   *
   * @param uid
   * @param photoUrl
   */
  saveUserPhoto(uid: string, photoUrl: string, email: string) {
    if(uid != null && photoUrl != null) {
      return this.saveUserProfile(uid, {photoUrl: photoUrl, email: email});
    } else {
      throw new Error("User id och photo url kan inte vara tomt.");
    }
  }

  /**
   * Gets the selected user profile info.
   * @param uid - Selected Firebase user id.
   * @returns {Observable<IUserProfile>} - Return a observable to subscribe changes for user info
   */
  getUserProfile(uid: string) {
    if(uid) {
      let userProfile = this.dbRef.object(Schema.userInfo(uid));
      return userProfile;
    } else {
      throw new Error("Ett fel inträffade vid hämtning av användaren: " + uid);
    }
  }

  /**
   * Saves or update the user profile
   * @param uid - Firebase generated user id
   * @param info - Information model of the user to save
   */
  saveUserProfile(uid: string, info: any) {
    let userInfo = this.dbRef.object(Schema.userInfo(uid));
    if(userInfo == null) {
      return userInfo.set(info);
    } else {
      return userInfo.update(info);
    }
  }
 }
