import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import { User } from "firebase/app";
import {Observable} from "rxjs/Observable";
import {FirebaseAuthService} from "../firebase/services/firebase-auth.service";

/**
 * Created by mikaelekroth on 2017-06-26.
 */

export class AuthResolver implements Resolve<User> {

  constructor(private authRef: FirebaseAuthService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User | Observable<User> | Promise<User> {
    return this.authRef.getCurrentUser();
  }
}
