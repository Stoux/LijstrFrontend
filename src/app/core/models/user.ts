export interface Permission {
  id: number;
  name: string;
}

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

export class LoginAttempt {
  id: number;
  timestamp: number;
  remoteAddress: string;
  usedPort: number;
  userAgent: string;
  username: string;
  success: boolean;
  rejectionReason?: string;
  loginType: string;
}

export class UserDetails {
  user: FullUser;
  lastLogin?: LoginAttempt;
  lastFailedLoginAttempt?: LoginAttempt;
}
