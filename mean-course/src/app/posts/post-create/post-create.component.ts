import { Component } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl:'./post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  // properties
  newPost = 'No content';
  enteredValue = '';

  // // to input an HTMLTextAreaElement
  // onAddPost(postInput: HTMLTextAreaElement){
  //   // <textarea rows="6"></textarea>
  //   console.log(postInput);
  //   // textarea object
  //   console.dir(postInput);
  //   this.newPost = postInput.value;
  // }

  onAddPost() {
    this.newPost = this.enteredValue;
  }
}
