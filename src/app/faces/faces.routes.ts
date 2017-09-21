import {Routes} from "@angular/router";
import {FacesPageComponent} from "./faces-page.component";
import {AuthGuard} from "../auth.guard";

export const FACES_ROUTES: Routes = [
  { path: '',   component: FacesPageComponent, canActivate: [AuthGuard] }
]
