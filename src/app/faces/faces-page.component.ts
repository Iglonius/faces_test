import { Component, OnInit } from '@angular/core';
import {Face} from "../models/face";
import {UserService} from "../services/user.service";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/from";

/**
 * Face page component contain out listing of users faces.
 */
@Component({
  selector: 'hiq-faces',
  templateUrl: './faces-page.component.html',
  styleUrls: ['./faces-page.component.scss']
})
export class FacesPageComponent implements OnInit {

  /**
   * All users faces stores in a Observable for subscribing updates.
   */
  faces: Observable<Face[]>;

  /**
   * Search result data contain of querying from Faces-collection.
   * And uses for view to populate the faces.
   */
  serchResult: Observable<Face[]>;

  /**
   * Search term text which is binds the search feild
   */
  searchTerm: string;

  constructor(private userService: UserService)
  {
    this.faces = this.userService.getUserFaces();
    this.serchResult = this.faces;
  }

  ngOnInit() { }

  /**
   * Event which makes the filtering of the faces-collection.
   */
  onSearch(): void {
    let term = this.searchTerm.toLowerCase();
    this.serchResult = this.faces.map(faceArr => faceArr.filter(face => this.selectFace(face, term)));
  }

  /**
   * Filter query. Now it takes all users which has the search term in their names.
   * TODO: Add quering for teams
   * @param {Face} face - Faces object which contains the name to search on.
   * @param {string} term - search term from the search input field
   * @returns {boolean} - True if it's a match
   */
  selectFace(face: Face, term: string): boolean {
    return face.name.toLowerCase().indexOf(term) > -1;
  }

}
