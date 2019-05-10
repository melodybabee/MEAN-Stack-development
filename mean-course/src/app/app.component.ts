import { Component } from '@angular/core';

@Component({
  // this part will be called by index.html
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // got an array of posts in there
  // storedPosts: Post[] = [];

  // onPostAdded(post) {
  //   this.storedPosts.push(post);
  // }
}
