
export interface IFace {
  $userKey?: string;
  name: string;
  photoUrl: string;
  email: string;
  teams: string[];
}

/**
 * Face class is a view model to show the kind of data needed for Face-page.
 */
export class Face implements IFace {
  name: string;
  photoUrl: string;
  email: string;
  teams: string[];

  constructor (name: string, photoUrl: string, email:string, teams: string[]) {
    this.name = name;
    this.photoUrl = photoUrl;
    this.email = email;
    this.teams = teams;
  }
}
