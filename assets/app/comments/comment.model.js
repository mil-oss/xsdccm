export class Comment {
    constructor(topicId, commentId, content, username, userId, timestamp, updated, token) {
        this.topicId = topicId;
        this.commentId = commentId;
        this.content = content;
        this.username = username;
        this.userId = userId;
        this.timestamp = timestamp;
        this.updated = updated;
        this.token = token;
    }
}
