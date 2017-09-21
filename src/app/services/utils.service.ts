import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

  constructor() { }

  /**
   * Helper method to sort descending of the date.
   *
   * @param a - A date to compare with
   * @param b - B date to compare with
   * @returns {number} - -1 if A > B else 1
   */
  sortByEndDate(a,b){
    let aDate = new Date(a.end);
    let bDate = new Date(b.end);
    return aDate > bDate ? -1 : 1;
  }

}
