import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PostService } from '../../service/post.service';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrl: './view-all.component.scss'
})
export class ViewAllComponent {
  allPosts:any;

  constructor(private router:Router,private message:MatSnackBar,private postService:PostService){}

  ngOnInit(){
    this.getAllPosts();
  }

  getAllPosts(){
    this.postService.getAllPosts().subscribe(res=>{
      console.log(res);
      this.allPosts=res;
    }, error=>{
      this.message.open("Somthing went Wrong!","Ok");
    })
  }

}

