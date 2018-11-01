export class Resource {
    constructor(resourceId, name, path, owner, description, token, access) {
        this.resourceId = resourceId;
        this.name = name;
        this.path = path;
        this.owner = owner;
        this.description = description;
        this.token = token;
        this.access = access;
    }
}
export class Access {
    constructor(resourceId, reason, sponsorId, sponsorOrganization, sponsorName, sponsorEmail, expires, read, write, authorize_access) {
        this.resourceId = resourceId;
        this.reason = reason;
        this.sponsorId = sponsorId;
        this.sponsorOrganization = sponsorOrganization;
        this.sponsorName = sponsorName;
        this.sponsorEmail = sponsorEmail;
        this.expires = expires;
        this.read = read;
        this.write = write;
        this.authorize_access = authorize_access;
    }
}
