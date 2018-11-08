import "rxjs/Rx";

import { EventEmitter, Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import { Observable } from "rxjs";

import { Comment } from "./comment.model";
import { ErrorService } from "./../errors/error.service";

@Injectable()
export class CommentService {
  private comments: Comment[] = [];
  public commentEdit = new EventEmitter<Comment>();
  private baseUrl = "http://127.0.0.1:9300/";

  public editMode:boolean[]=[];

  constructor(private http: Http, private errorService: ErrorService) {}

  addComment(message: Comment) {
    const body = JSON.stringify(message);
    const headers = new Headers({ "Content-Type": "application/json" });

    const tkn = localStorage.getItem("token")
      ? "?token=" + localStorage.getItem("token")
      : "";
    return this.http
      .post(this.baseUrl+"comment" + tkn, body, { headers: headers })
      .map((response: Response) => {
        const result = response.json();
        console.log(result);
        const comment = new Comment(
          result.obj.content,
          result.obj.username,
          result.obj.meta.created,
          result.obj.meta.updated,
          result.obj.messageId,
          result.obj.userId
        );
        this.comments.push(comment);
        console.log(comment);
        return comment;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error);
        return Observable.throw(error);
      });
  }

  getComments() {
    console.log('getComments');
    return this.http
      .get(this.baseUrl + "comment")
      .map((response: Response) => {
        const comments = response.json().obj;
        let transformedComments: Comment[] = [];
        for (let comment of comments) {
          transformedComments.push(
            new Comment(
              comment.topicId,
              comment.commentId,
              comment.content,
              comment.username,
              comment.userId,
              comment.meta.created,
              comment.meta.updated
            )
          );
        }
        this.comments = transformedComments;
        //console.log(messages);
//        console.log(transformedMessages);
        return transformedComments;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error);
        return Observable.throw(error);
      });
  }

  editComment(comment: Comment) {
    this.editMode[comment.commentId]=true;
    this.commentEdit.emit(comment);
  }

  updateComment(comment: Comment) {
    const body = JSON.stringify(comment);
    this.editMode[comment.commentId]=false;
    const headers = new Headers({ "Content-Type": "application/json" });
    const token = localStorage.getItem("token")
      ? "?token=" + localStorage.getItem("token")
      : "";
    return this.http
      .patch(this.baseUrl + "comment" + token, body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error);
        return Observable.throw(error);
      });
  }

  deleteComment(comment: Comment) {
    this.editMode[comment.commentId]=false;
    this.comments.splice(this.comments.indexOf(comment), 1);
    const token = localStorage.getItem("token")
      ? "?token=" + localStorage.getItem("token")
      : "";
    return this.http
      .delete(this.baseUrl + "message" + token, { body: comment })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error);
        return Observable.throw(error);
      });
  }
}
