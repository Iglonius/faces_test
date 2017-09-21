/**
 * Interface to contains the additional information of a user.
 */
export interface IUserProfile {
  $userKey?: string;
  firstname: string;
  lastname: string;
  email: string;
  bio: string;
  photoUrl: string;
}

/**
 * User profile class contains additional information of a user.
 * Implements IUserProfile for it's properties.
 */
export class UserProfile implements IUserProfile {
  public firstname: string;
  public lastname: string;
  public email: string;
  public bio: string;
  public photoUrl: string;

  constructor () {}
}
