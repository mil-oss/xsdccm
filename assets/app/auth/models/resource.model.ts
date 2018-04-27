export class Resource {
  constructor(
    public resourceId:string,
    public name:string,
    public path:string,
    public owner:string,
    public description?:string,
    public token?: string,
    public access?: Access[]
  ) {}
}

export class Access {
  constructor(
    public resourceId: string,
    public reason: string,
    public sponsorId: string,
    public sponsorOrganization?: string,
    public sponsorName?: string,
    public sponsorEmail?: string,
    public expires?: number,
    public read?: boolean,
    public write?: boolean,
    public authorize_access?: boolean
  ) {}
}
