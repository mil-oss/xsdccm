export class Error{
    constructor(
        public title: string,
        public message: string,
        public status?: number,
    ){}
}
