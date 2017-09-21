import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import {EditResumePageComponent} from "./edit-resume-page/edit-resume-page.component";
import {
  EditExperienceItemComponent } from "./edit-resume-page/components/edit-experience-list/edit-experience-item/edit-experience-item.component";
import {EditExperienceListComponent} from "./edit-resume-page/components/edit-experience-list/edit-experience-list.component";
import {EditUserInfoComponent} from "./edit-resume-page/components/edit-user-info/edit-user-info.component";
import {RouterModule} from "@angular/router";
import {RESUME_ROUTES} from "./resume.routes";
import {UploadImageComponent} from "./edit-resume-page/components/upload-image/upload-image.component";
import {CollapseModule, DatepickerModule, ModalModule} from "ngx-bootstrap";
import { ExperienceItemFormComponent } from './edit-resume-page/components/edit-experience-list/edit-experience-item-form/experience-item-form.component';
import { ResumePageComponent } from './resume-page/resume-page.component';
import { ExperienceListComponent } from './resume-page/components/experience-list/experience-list.component';
import {AuthModule} from "../auth/auth.module";
import { ExperienceItemComponent } from './resume-page/components/experience-list/experience-item/experience-item.component';
import { PrintDirective } from './print.directive';
import {ImageCropperModule} from "ng2-img-cropper";

@NgModule({
  declarations: [
    EditResumePageComponent,
    EditExperienceListComponent,
    EditExperienceItemComponent,
    EditUserInfoComponent,
    UploadImageComponent,
    ExperienceItemFormComponent,
    ExperienceListComponent,
    ResumePageComponent,
    ExperienceItemComponent,
    PrintDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthModule,
    ImageCropperModule,
    RouterModule.forRoot(RESUME_ROUTES),
    CollapseModule.forRoot(),
    DatepickerModule.forRoot(),
    ModalModule.forRoot()
  ],
})
export class ResumeModule { }
