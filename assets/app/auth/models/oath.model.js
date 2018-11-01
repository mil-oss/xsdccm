export class Token {
    constructor(accessToken, accessTokenExpiresAt, refreshToken, refreshTokenExpiresAt, user) {
        this.accessToken = accessToken;
        this.accessTokenExpiresAt = accessTokenExpiresAt;
        this.refreshToken = refreshToken;
        this.refreshTokenExpiresAt = refreshTokenExpiresAt;
        this.user = user;
    }
}
export class AuthorizationCode {
    constructor(code, scope, expiresAt, redirectUri, client, user) { }
}
export class Client {
    constructor(id, clientSecret, grants, redirectUris) { }
}
export class User {
    constructor(id) { }
}
