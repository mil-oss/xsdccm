var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import "rxjs/Rx";
import { EventEmitter, Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";
import { Observable } from "rxjs";
import { Comment } from "./comment.model";
import { ErrorService } from "./../errors/error.service";
let CommentService = class CommentService {
    constructor(http, errorService) {
        this.http = http;
        this.errorService = errorService;
        this.comments = [];
        this.commentEdit = new EventEmitter();
        this.baseUrl = "http://127.0.0.1:9300/";
        this.editMode = [];
    }
    addComment(message) {
        const body = JSON.stringify(message);
        const headers = new Headers({ "Content-Type": "application/json" });
        const tkn = localStorage.getItem("token")
            ? "?token=" + localStorage.getItem("token")
            : "";
        return this.http
            .post(this.baseUrl + "comment" + tkn, body, { headers: headers })
            .map((response) => {
            const result = response.json();
            console.log(result);
            const comment = new Comment(result.obj.content, result.obj.username, result.obj.meta.created, result.obj.meta.updated, result.obj.messageId, result.obj.userId);
            this.comments.push(comment);
            console.log(comment);
            return comment;
        })
            .catch((error) => {
            this.errorService.handleError(error);
            return Observable.throw(error);
        });
    }
    getComments() {
        console.log('getComments');
        return this.http
            .get(this.baseUrl + "comment")
            .map((response) => {
            const comments = response.json().obj;
            let transformedComments = [];
            for (let comment of comments) {
                transformedComments.push(new Comment(comment.topicId, comment.commentId, comment.content, comment.username, comment.userId, comment.meta.created, comment.meta.updated));
            }
            this.comments = transformedComments;
            //console.log(messages);
            //        console.log(transformedMessages);
            return transformedComments;
        })
            .catch((error) => {
            this.errorService.handleError(error);
            return Observable.throw(error);
        });
    }
    editComment(comment) {
        this.editMode[comment.commentId] = true;
        this.commentEdit.emit(comment);
    }
    updateComment(comment) {
        const body = JSON.stringify(comment);
        this.editMode[comment.commentId] = false;
        const headers = new Headers({ "Content-Type": "application/json" });
        const token = localStorage.getItem("token")
            ? "?token=" + localStorage.getItem("token")
            : "";
        return this.http
            .patch(this.baseUrl + "comment" + token, body, { headers: headers })
            .map((response) => response.json())
            .catch((error) => {
            this.errorService.handleError(error);
            return Observable.throw(error);
        });
    }
    deleteComment(comment) {
        this.editMode[comment.commentId] = false;
        this.comments.splice(this.comments.indexOf(comment), 1);
        const token = localStorage.getItem("token")
            ? "?token=" + localStorage.getItem("token")
            : "";
        return this.http
            .delete(this.baseUrl + "message" + token, { body: comment })
            .map((response) => response.json())
            .catch((error) => {
            this.errorService.handleError(error);
            return Observable.throw(error);
        });
    }
};
CommentService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, ErrorService])
], CommentService);
export { CommentService };
