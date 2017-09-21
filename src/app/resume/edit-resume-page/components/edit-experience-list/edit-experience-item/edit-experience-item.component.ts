import {Component, Input, OnInit} from '@angular/core';
import {Experience} from "../../../../../models/experience";
import {UserService} from "../../../../../services/user.service";
import {ExperienceFormArgs} from "../../../../models/experience-form-args";

@Component({
  selector: 'hiq-edit-experience-item',
  templateUrl: './edit-experience-item.component.html',
  styleUrls: ['./edit-experience-item.component.scss']
})
export class EditExperienceItemComponent implements OnInit {

  @Input() experience: Experience;

  constructor(private userService: UserService) { }

  ngOnInit() { }

  public isCollapsed:boolean = true;

  public collapsed(event:any):void {
  }

  public expanded(event:any):void {
  }

  remove(event: ExperienceFormArgs) {
    if(event !== null) {
      this.userService.removeUserExperience(event.$key);
    }
  }

  saveChanges(event: ExperienceFormArgs) {
    if(event !== null) {
      this.userService.saveUserExperience(event.$key, event.experience);
    }
  }
}
