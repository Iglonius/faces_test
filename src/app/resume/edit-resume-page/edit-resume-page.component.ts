import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Experience} from "../../models/experience";
import {EXPERIENCE_TYPES} from "../resume.constants";
import {UtilsService} from "../../services/utils.service";

@Component({
  selector: 'hiq-edit-resume-page',
  templateUrl: './edit-resume-page.component.html',
  styleUrls: ['./edit-resume-page.component.scss']
})
export class EditResumePageComponent implements OnInit {

  experiences: Observable<Experience[]>;
  work: Observable<Experience[]>;
  education: Observable<Experience[]>;

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private utils: UtilsService) {}

  ngOnInit()
  {
    var userId;

    this.route.params.subscribe(params => {
      userId = params['uid'] ? params['uid'] : this.userService.getUserId();
    });

    this.experiences = this.userService.getUserExperiences(userId);
    this.education = this.experiences.map(exp => exp.filter(e => e.type === EXPERIENCE_TYPES.education).sort(this.utils.sortByEndDate));
    this.work = this.experiences.map(exp => exp.filter(e => e.type === EXPERIENCE_TYPES.work).sort(this.utils.sortByEndDate));
  }

  /**
   * Event to show the preview screen
   * @param event
   */
  onPreview(event) {
    event.preventDefault();

    let userId = this.userService.getUserId();

    //Navigates to the preview page /resume/:uid
    this.router.navigate(['resume', userId]);
  }
}
