import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PostService } from '../../service/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {

  postForm!:FormGroup;
  tags:string[]=[];

  constructor(private fb:FormBuilder,private router:Router,private message:MatSnackBar,private postService:PostService){}

  ngOnInit(){
    this.postForm=this.fb.group({
      name:[null,Validators.required],
      content:[null,[Validators.required,Validators.maxLength(5000)]],
      img:[null,Validators.required],
      postedBy:[null,Validators.required],
    })
  }

  //for managing tags
  add(event:any){
    const value=(event.value || '').trim();
    if(value){
      this.tags.push(value);
    }
    event.chipInput!.clear();
  }

  remove(tag:any){
    const index=this.tags.indexOf(tag);
    if(index>=0){
      this.tags.splice(index,1);
    }
  }

  createPost(){
    const data= this.postForm.value;
    data.tags = this.tags;

    this.postService.createNewPost(data).subscribe(res=>{
      this.message.open("Post Created Successfully!","Ok");
      this.router.navigateByUrl("/view-all");
    }, error=>{
      this.message.open("Somthing went Wrong, Please try again!","Ok");
    })
  }

}
