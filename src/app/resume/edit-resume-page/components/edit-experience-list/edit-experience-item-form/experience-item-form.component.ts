import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Experience} from "../../../../../models/experience";
import {ExperienceFormArgs} from "../../../../models/experience-form-args";

@Component({
  selector: 'hiq-experience-item-form',
  templateUrl: './experience-item-form.component.html',
  styleUrls: ['./experience-item-form.component.scss']
})
export class ExperienceItemFormComponent implements OnInit {

  @Input() experience: Experience;
  @Input() type: string;
  @Output() onSave = new EventEmitter<ExperienceFormArgs>();
  @Output() onRemove = new EventEmitter<ExperienceFormArgs>();

  organisationLabel: string;
  titleLabel: string;

  key: string = '';
  title: string = '';
  description: string = '';
  organisation: string ='';
  begin = new Date();
  end  = new Date();

  maxDate = new Date();

  resetForm: boolean = true;
  isNew: boolean = true;

  constructor() {}

  ngOnInit() {
    this.titleLabel = this.type === 'work' ? 'Titel' : 'Program/Kurs';
    this.organisationLabel = this.type === 'work' ? 'Organisation' : 'Universitet';

    if(this.experience !== null) {
      this.isNew = false;

      this.key = this.experience.$key;
      this.title = this.experience.title;
      this.description = this.experience.description;
      this.organisation = this.experience.organisation;
      this.begin = this.experience.begin ? new Date(this.experience.begin) : new Date();
      this.end = this.experience.end ? new Date(this.experience.end) : new Date();
    }
  }

  save() {
    if(this.experience === null) {
      this.experience = new Experience();
    }

    this.experience.title = this.title;
    this.experience.description = this.description;
    this.experience.organisation = this.organisation;
    this.experience.begin = this.getDateString(this.begin);
    this.experience.end = this.getDateString(this.end);
    this.experience.type = this.type;

    let eventArgs = new ExperienceFormArgs();

    eventArgs.$key = this.key;
    eventArgs.experience = this.experience;

    if(this.isNew) {
      this.reset();
    }

    this.onSave.emit(eventArgs);
  }

  private reset() {
    this.title = '';
    this.description = '';
    this.organisation = '';
    this.begin = new Date();
    this.end = new Date();
  }

  remove() {
    let eventArgs = new ExperienceFormArgs();

    eventArgs.$key = this.key;
    eventArgs.experience = this.experience;

    this.onRemove.emit(eventArgs);
  }

  private getDateString(date: Date) {
    let year, month, day;
    year = date.getFullYear();
    month = date.getMonth()+1;
    day = date.getDate();

    return `${year}-${month}-${day}`;
  }
}
