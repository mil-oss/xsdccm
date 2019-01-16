import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Comment } from './comment.model';
import { CommentService } from './comment.service';

@Component( {
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ["./comments.component.css"]
} )
export class CommentsComponent implements OnInit {

    comments: Comment[];

    constructor(private commentService:CommentService){}

    ngOnInit(){
        this.commentService.getComments()
        .subscribe(
             (comments: Comment[]) =>{
                 this.comments=comments;
             }
        );
        this.commentsQuery.uiQuery.selectEntity(1).subscribe();
    }

}
