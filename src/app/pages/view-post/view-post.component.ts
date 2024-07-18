import { Component } from '@angular/core';
import { PostService } from '../../service/post.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../../service/comment.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.scss'
})
export class ViewPostComponent {

  postId = this.activatedrouter.snapshot.params['id'];
  postData:any;
  comments:any;

  commentForm!:FormGroup;

  constructor(private postservice:PostService,
    private activatedrouter:ActivatedRoute,
    private message:MatSnackBar,
    private fb:FormBuilder,
    private commentService:CommentService){}

  ngOnInit(){
    console.log(this.postId);
    this.getPostById();

    //for comment
    this.commentForm=this.fb.group({
      postedBy:[null,Validators.required],
      content: [null,Validators.required]
    })
    
  }

  publishComment(){
    const postedBy=this.commentForm.get('postedBy')?.value;
    const content=this.commentForm.get('content')?.value;

    this.commentService.createComment(this.postId,postedBy,content).subscribe(res=>{
      this.message.open("Comment Published Successfully!","Ok");
      this.getCommentByPost();
    },error=>{
      this.message.open("Something went wrong, Try again!","Ok")
    })
  }

  getCommentByPost(){
    this.commentService.getAllCommentByPost(this.postId).subscribe(res=>{
      this.comments=res;
    },error=>{
      this.message.open("Something went wrong, Try again!","Ok")
    })
  }

  getPostById(){
    this.postservice.getPostById(this.postId).subscribe(res=>{
      this.postData = res;
      console.log(res);
      this.getCommentByPost();
    },error=>{
      this.message.open("Something went wrong, Try again!","Ok")
    })
  }

  likePost(){
    this.postservice.likePost(this.postId).subscribe((response)=>{
      this.message.open("Post Liked Successfully!","Ok");
      this.getPostById();
    },error=>{
      this.message.open("Something went wrong, Try again!","Ok")
    })
  }

}
