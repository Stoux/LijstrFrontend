export class GrantedPermission {
  id: number;
  authority: string;
  lastModified: number;
  created: number;
}

export class User {
  id: number;
  displayName: string;
}

export class FullUser extends User {
  username: string;
  email: string;
  avatar: boolean;
  approvedFor: string;

  lastModified: number;
  created: number;

  oldSiteUser: string;

  grantedPermissions: GrantedPermission[];
}
