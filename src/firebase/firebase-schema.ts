/**
 * Created by mikaelekroth on 2017-06-22.
 */
export const SCHEMA_PATHS = {
  users: {
    root: "/users",
    single: "/users/${uid}",
    info: "/users/${uid}/info",
    experiences: "/users/${uid}/experiences",
    experience: "/users/${uid}/experiences/${key}",
  }
}

export class Schema {
  static users() {
    return SCHEMA_PATHS.users.root;
  }

  static user(uid: string): string {
    return this.formatUserPath(SCHEMA_PATHS.users.single, ['${uid}'], [uid]);
  }

  static userInfo(uid: string): string {
    return this.formatUserPath(SCHEMA_PATHS.users.info, ['${uid}'], [uid]);
  }

  static userExperiences(uid: string) {
    return this.formatUserPath(SCHEMA_PATHS.users.experiences, ['${uid}'], [uid])
  }

  static userSingleExperience(uid: string, key:string) {
    return this.formatUserPath(SCHEMA_PATHS.users.experience, ['${uid}', '${key}'], [uid, key])
  }

  private static formatUserPath(path: string, params: string[], values: string[]): string {

    var formattedPath = path;

    for(let i = 0; i < params.length; i++) {
      formattedPath = formattedPath.replace(params[i], values[i]);
    }

    return formattedPath;
  }

}
