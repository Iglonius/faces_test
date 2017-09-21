import {Component, Input, OnInit} from '@angular/core';
import {Experience} from "../../../../models/experience";
import {UserService} from "../../../../services/user.service";
import {ExperienceFormArgs} from "app/resume/models/experience-form-args";
import {Observable} from "rxjs/Observable";


@Component({
  selector: 'hiq-edit-experience-list',
  templateUrl: './edit-experience-list.component.html',
  styleUrls: ['./edit-experience-list.component.scss']
})
export class EditExperienceListComponent implements OnInit{

  @Input() experiences: Observable<Experience[]>;
  @Input() experienceType: string;
  @Input() experienceTitle: string;

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    if(this.experiences) {
      this.experiences.map(exp => exp.filter(e => e.type === this.experienceType));
    };
  }


  public isCollapsed:boolean = true;

  public collapsed(event:any):void { }

  public expanded(event:any):void { }

  /**
   * Save the new experience to database
   * @param {Experience} experience - New experience to save.
   */
  save(event: ExperienceFormArgs) {
    //TODO: Some validation.

    if(event !== null) {
      this.userService.saveUserExperience(event.$key, event.experience);
    }
  }
}
