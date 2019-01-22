import { Component, Input } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Comment } from "../state/comment.model";
import { CommentService } from "../state/comments.service";

@Component({
  selector: "app-comment",
  templateUrl: "./comment.component.html",
  styleUrls: ["./comment.component.css"]
})

export class CommentComponent {

  @Input() comment: Comment;

  constructor(private commentService: CommentService) { }

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
  onSubmit(form: NgForm) {
    if (this.comment) {
      //Edit
      this.comment.content = form.value.content;
      this.commentService
        .updateComment(this.comment)
        .subscribe(result => console.log(result));
    } else {
      //Create
      const comment = new Comment(
        form.value.content,
        "Max",
        Date.now().toString(),
        "",
        Date.now().toString(),
        "Dummy"
      );
      this.commentService
        .addComment(comment)
        .subscribe(data => console.log(data), error => console.log(error));
    }
    form.resetForm();
  }

  onClear(form: NgForm) {
    this.comment = null;
    form.resetForm();
  }

  onCancel(form: NgForm) {
    this.commentService.editMode[this.comment.commentId] = false;
  }

  saveMessage(form: NgForm) {
    if (this.comment) {
      this.saveEdit(form);
    } else {
      this.saveNew(form);
    }
  }

  saveNew(form: NgForm) {
    var fc = form.value.content;
    var c = new Comment(fc.topicId, fc.commentId, fc.content, fc.username, fc.userId, fc.timestamp, fc.updated, fc.token);
    this.commentService.addComment(c);
  }

  saveEdit(form: NgForm) {
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
}
