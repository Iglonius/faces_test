import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";

import {FacesPageComponent} from "./faces-page.component";
import {FaceItemComponent} from "./components/face-item/face-item.component";
import {RouterModule} from "@angular/router";
import {FACES_ROUTES} from "./faces.routes";

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(FACES_ROUTES)
  ],
  declarations: [
    FacesPageComponent,
    FaceItemComponent
  ]
})
export class FacesModule { }
