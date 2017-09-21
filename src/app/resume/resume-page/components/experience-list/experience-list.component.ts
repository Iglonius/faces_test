import {Component, Input, OnInit} from '@angular/core';
import {Experience} from "../../../../models/experience";
import {Observable} from "rxjs/Observable";

/**
 * Component to show all experience which is set.
 */
@Component({
  selector: 'hiq-experience-list',
  templateUrl: './experience-list.component.html',
  styleUrls: ['./experience-list.component.scss']
})
export class ExperienceListComponent implements OnInit {

  /**
   * Sets the collection of experience for populate the list.
   */
  @Input() experiences: Observable<Experience[]>;

  /**
   * Sets the title of the list
   */
  @Input() experienceTitle: string;

  constructor() { }

  ngOnInit() {
  }

}
