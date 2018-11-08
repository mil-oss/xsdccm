export class Comment {

    constructor(
        public topicId: string,
        public commentId: string,
        public content: string,
        public username?: string,
        public userId?: string,
        public timestamp?: string,
        public updated?: string,
        public token?:string 
    ) {
    }
}
