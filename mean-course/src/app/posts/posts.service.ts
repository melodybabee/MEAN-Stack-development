import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject }from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  getPosts(){
    // [] is square brackets, take three dots to take all the elements of another array, pull them out of that array and add them to the new array
    // make a full copy of array
    return [...this.posts];
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string){
    const post: Post = {title: title, content: content};
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
