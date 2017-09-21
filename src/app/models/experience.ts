/**
 * Interface over the Experience object from firebase.
 */
interface IExperience {
  $userKey?: string;
  title: string;
  begin: any;
  end: any;
  description: string;
  organisation: string;
  type: string;
}

/**
 * Experience class implements the IExperience properties to contain this kind of data.
 */
export class Experience implements IExperience {
  $key: string;
  title: string;
  begin: string;
  end: string;
  description: string;
  organisation: string;
  type: string;
}
