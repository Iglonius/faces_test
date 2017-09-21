import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Experience} from "../../models/experience";
import {UserService} from "../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {EXPERIENCE_TYPES} from "../resume.constants";
import {UtilsService} from "../../services/utils.service";
import {UserProfile} from "../../models/userProfile";
declare const jQuery: any;

@Component({
  selector: 'hiq-resume-page',
  templateUrl: './resume-page.component.html',
  styleUrls: ['./resume-page.component.scss']
})
export class ResumePageComponent implements OnInit, AfterViewInit {

  user: Observable<UserProfile>;
  works: Observable<Experience[]>;
  educations: Observable<Experience[]>;
  experiences: Observable<Experience[]>;
  uid: string;
  photoUrl: string;
  ngAfterViewInit(): void {
  }

  constructor(private userService: UserService,
              private utils: UtilsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.uid = params['uid'] ? params['uid'] : this.userService.getUserId();
    });

    this.user = this.userService.getUserProfile(this.uid);

    this.user.subscribe(u => {
      this.photoUrl = u.photoUrl;
    });

    this.experiences = this.userService.getUserExperiences(this.uid);
    this.educations = this.experiences.map(exp => exp.filter(e => e.type === EXPERIENCE_TYPES.education).sort(this.utils.sortByEndDate));
    this.works = this.experiences.map(exp => exp.filter(e => e.type === EXPERIENCE_TYPES.work).sort(this.utils.sortByEndDate));  }
}
