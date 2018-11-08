export class Token {
  constructor(
    public accessToken: String,
    public accessTokenExpiresAt: Date,
    public refreshToken: String,
    public refreshTokenExpiresAt: String,
    public user: User
  ) {}
}
export class AuthorizationCode {
  constructor(
    code: String,
    scope: String,
    expiresAt: Date,
    redirectUri: String,
    client: Client,
    user: User
  ) {}
}
export class Client {
  constructor(
    id: String,
    clientSecret: String,
    grants: [String],
    redirectUris: [String]
  ) {}
}
export class User {
  constructor(id: String) {}
}
