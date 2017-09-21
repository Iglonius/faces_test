import {Routes} from "@angular/router";
import {AuthResolver} from "../auth.resolver";
import {LoginPageComponent} from "./login/login-page.component";
import {LogoutComponent} from "./components/logout/logout.component";
import {RegisterPageComponent} from "./register/register-page.component";
import {VerifyEmailPageComponent} from "./register/verify-email/verify-email-page.component";

export const AUTH_ROUTES: Routes = [
  { path: 'login',                 component: LoginPageComponent },
  { path: 'logout',                component: LogoutComponent },
  { path: 'register',              component: RegisterPageComponent},
  { path: 'verify/:mode/:oobCode', component: VerifyEmailPageComponent, resolve: { currentUser: AuthResolver} },
]
