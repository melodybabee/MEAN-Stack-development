import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject }from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient ) {}

  getPosts(){
    // [] is square brackets, take three dots to take all the elements of another array, pull them out of that array and add them to the new array
    // make a full copy of array
    // return [...this.posts];

    // connect to backend
    this.http.get<{messsage: string, posts: Post[]}>('http://localhost:3001/api/posts')
      .subscribe( (postData) => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string){
    const post: Post = {id: null, title: title, content: content};
    this.http.post<{message: string}>('http://localhost:3001/api/posts', post)
    .subscribe((responseData) => {
      console.log(responseData.message);
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });
  }
}
