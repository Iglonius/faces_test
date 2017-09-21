import { Injectable } from '@angular/core';
import {FirebaseApp} from "angularfire2";
import * as firebase from "firebase/app";
import UploadTask = firebase.storage.UploadTask;

@Injectable()
export class FirebaseStorageService {

  constructor(private fbApp: FirebaseApp) { }

  /**
   * Uploading a file to Firebase Storage
   * @param uid - Users Firebase id
   * @param path - The path where to store the file
   * @param file - File to store
   * @param metadata - Meta data to the file
   * @returns {firebase.storage.UploadTask} - Returns a task to listen on.
   */
  uploadFileToStorage (uid: string, path: string, file: File, metadata: any) : UploadTask {
    let storePath = path.startsWith('/') ? path.substr(1, path.length-1) : path;
    return this.fbApp.storage().ref(uid+"/").child(storePath +"/"+ file.name).put(file, metadata);
  }

  /**
   * Uploading a base64 string to Firebase Storage
   * @param uid - Users Firebase id
   * @param path - The path where to store the file
   * @param base64 - Base64 data to store
   * @param metadata - Meta data to the file
   * @returns {firebase.storage.UploadTask} - Returns a task to listen on.
   */
  uploadBase64ToStorage (uid: string, path: string, base64: any, mimeType: string, filename: string) : UploadTask {
    let storePath = path.startsWith('/') ? path.substr(1, path.length-1) : path;
    return this.fbApp.storage().ref(uid+"/").child(storePath +"/"+ filename).putString(base64, 'base64', { contentType: mimeType });
  }
}
