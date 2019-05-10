import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";

import { PostsService } from "../posts.service";

@Component({
  selector: 'app-post-create',
  templateUrl:'./post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  // properties
  enteredContent = '';
  enteredTitle = '';
  // could listen from outside and from the parent component
  // EventEmitter<Post> in order to make a general type Post
  // postCreated = new EventEmitter<Post>();

  // // to input an HTMLTextAreaElement
  // onAddPost(postInput: HTMLTextAreaElement){
  //   // <textarea rows="6"></textarea>
  //   console.log(postInput);
  //   // textarea object
  //   console.dir(postInput);
  //   this.newPost = postInput.value;
  // }
  constructor( public postsService: PostsService){}

  onAddPost( form: NgForm ) {
    if(form.invalid){
      return;
    }
    this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }
}
