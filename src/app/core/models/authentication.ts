/**
 * Data object that contains the information for authenticating with the server.
 * The rememberMe options allows for a greater window to refresh the token.
 * See accessTill and validTill in AuthenticationToken.
 */
export class AuthenticationRequest {
  constructor(public username?: string,
              public password?: string,
              public rememberMe: boolean = true) {
  }
}

/**
 * Data object that contains the information for a token refresh request.
 */
export class RefreshRequest {
  constructor(public currentToken: string) {
  }
}

/**
 * An authentication token wrapper with a token issued by the server.
 * Also contains expire times of the token and the user it is issued for.
 */
export class AuthenticationToken {
  userId: number;
  token: string;
  /**
   * Specifies the UTC time when this token expires for usage.
   * After this time you will need to re-authenticate or refresh the token if possible.
   */
  accessTill: number;
  /**
   * Specifies the UTC time when this token won't be refreshable anymore.
   * Till this time you can refresh the token which will have a new accessTill and validTill.
   * It is possible that this value is much greater than the accessTill value (allowing the user to stay logged in).
   */
  validTill: number;
}

/**
 * Data object that contains the information for a password reset request.
 */
export class ResetPasswordRequest {
  public username: string;
  public email: string;
}

/**
 * Data object that contains the information for a new password request.
 */
export class NewPasswordRequest {
  public resetToken: string;
  public newPassword: string;
}
