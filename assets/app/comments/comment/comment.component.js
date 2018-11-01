var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from "@angular/core";
import { Comment } from "./../comment.model";
import { CommentService } from "./../comment.service";
let CommentComponent = class CommentComponent {
    constructor(commentService) {
        this.commentService = commentService;
    }
    onEdit() {
        this.commentService.editMode[this.comment.commentId] = true;
        this.commentService.editComment(this.comment);
    }
    onDelete() {
        this.commentService.editMode[this.comment.commentId] = true;
        this.commentService
            .deleteComment(this.comment)
            .subscribe(result => console.log(result));
    }
    belongsToUser() {
        return localStorage.getItem("userId") === this.comment.userId;
    }
    onSubmit(form) {
        if (this.comment) {
            //Edit
            this.comment.content = form.value.content;
            this.commentService
                .updateComment(this.comment)
                .subscribe(result => console.log(result));
        }
        else {
            //Create
            const comment = new Comment(form.value.content, "Max", Date.now().toString(), "", Date.now().toString(), "Dummy");
            this.commentService
                .addComment(comment)
                .subscribe(data => console.log(data), error => console.log(error));
        }
        form.resetForm();
    }
    onClear(form) {
        this.comment = null;
        form.resetForm();
    }
    onCancel(form) {
        this.commentService.editMode[this.comment.commentId] = false;
    }
    saveMessage(form) {
        if (this.comment) {
            this.saveEdit(form);
        }
        else {
            this.saveNew(form);
        }
    }
    saveNew(form) {
        var fc = form.value.content;
        var c = new Comment(fc.topicId, fc.commentId, fc.content, fc.username, fc.userId, fc.timestamp, fc.updated, fc.token);
        this.commentService.addComment(c);
    }
    saveEdit(form) {
        this.commentService.editMode[this.comment.commentId] = false;
        this.comment.content = form.value.content;
        this.commentService
            .updateComment(this.comment)
            .subscribe(result => console.log(result));
    }
    deleteMessage() {
        this.commentService
            .deleteComment(this.comment)
            .subscribe(result => console.log(result));
    }
    nodeEdit() {
        return this.commentService.editMode[this.comment.commentId];
    }
};
__decorate([
    Input(),
    __metadata("design:type", Comment)
], CommentComponent.prototype, "comment", void 0);
CommentComponent = __decorate([
    Component({
        selector: "app-comment",
        templateUrl: "./comment.component.html",
        styleUrls: ["./comment.component.css"]
    }),
    __metadata("design:paramtypes", [CommentService])
], CommentComponent);
export { CommentComponent };
