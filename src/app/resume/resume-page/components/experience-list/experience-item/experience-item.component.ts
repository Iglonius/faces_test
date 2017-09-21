import {Component, Input, OnInit} from '@angular/core';
import {Experience} from "../../../../../models/experience";

/**
 * View component which contain a experience item view action.
 */
@Component({
  selector: 'hiq-experience-item',
  templateUrl: './experience-item.component.html',
  styleUrls: ['./experience-item.component.scss']
})
export class ExperienceItemComponent implements OnInit {

  /**
   * Inputs a experience object as a view model
   */
  @Input() experience: Experience;

  constructor() { }

  ngOnInit() {}

}
