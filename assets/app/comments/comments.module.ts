import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentComponent } from "./comment/comment.component";
import { CommentsComponent } from "./comments.component";
import { CommentService } from "./comment.service";
import { Comment } from "./comment.model";

@NgModule({
  declarations:[
        CommentsComponent,
        CommentComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    CommentService
  ]
})
export class CommentsModule { }
