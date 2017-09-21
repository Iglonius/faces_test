import { NgModule } from '@angular/core';
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule} from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import {FirebaseAuthService} from "./services/firebase-auth.service";
import {FirebaseStorageService} from "./services/firebase-storage.service";
import {UserReferenceService} from "./services/user-reference.service";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyA9jxs800BzP6tpbZJeIza8GXha0BgHbh4",
    authDomain: "hiscore-1b524.firebaseapp.com",
    databaseURL: "https://hiscore-1b524.firebaseio.com",
    projectId: "hiscore-1b524",
    storageBucket: "hiscore-1b524.appspot.com",
    messagingSenderId: "770711411446"
}

@NgModule({
  imports: [
    AngularFireModule.initializeApp(FIREBASE_CONFIG, 'hiscore-1b524'), // imports the firebase app for use of firebase
    AngularFireDatabaseModule, //imports firebase/database to get access to the firebase database features
    AngularFireAuthModule, // imports firebase/auth to get access to the firebase auth features
  ],
  providers: [FirebaseAuthService, FirebaseStorageService, UserReferenceService]
})

export class FirebaseModule { }
export { FirebaseAuthService, FirebaseStorageService, UserReferenceService}
