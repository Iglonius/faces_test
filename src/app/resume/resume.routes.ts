import {Routes} from "@angular/router";
import {EditResumePageComponent} from "./edit-resume-page/edit-resume-page.component";
import {ResumePageComponent} from "./resume-page/resume-page.component";

/**
 * All routes which is necessary for the resume module.
 */
export const RESUME_ROUTES: Routes = [
  { path: 'resume/edit',      component: EditResumePageComponent},
  { path: 'resume/edit/:uid',      component: EditResumePageComponent},
  { path: 'resume/:uid',      component: ResumePageComponent}
];
