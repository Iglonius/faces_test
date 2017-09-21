import {Component, Input, OnInit} from '@angular/core';
import {Face} from "../../../models/face";

/**
 * Face item component contains the functionality for the user information on the Face-page.
 */
@Component({
  selector: 'hiq-face-item',
  templateUrl: './face-item.component.html',
  styleUrls: ['./face-item.component.scss']
})
export class FaceItemComponent implements OnInit {

  /**
   * Face object uses as a view model for the template.
   */
  @Input() face: Face;

  constructor() { }

  ngOnInit() {

  }

}
