import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject }from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";
import { PostListComponent } from './post-list/post-list.component';
import { stringify } from '@angular/core/src/util';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(){
    // [] is square brackets, take three dots to take all the elements of another array, pull them out of that array and add them to the new array
    // make a full copy of array
    // return [...this.posts];

    // connect to backend
    this.http
      .get<{messsage: string, posts: any}>('http://localhost:3001/api/posts')
      .pipe(
        map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        });
      })
      )
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string){
    return this.http.get<{ _id: string, title: string, content: string}>(
      "http://localhost:3001/api/posts/" + id
      );
  }

  addPost(title: string, content: string){
    const post: Post = {id: null, title: title, content: content};
    this.http
    .post<{message: string, postId: string }>(
      'http://localhost:3001/api/posts',
      post
    )
    .subscribe((responseData) => {
      const id = responseData.postId;
      post.id = id;
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(["/"]);
    });
  }

  updatePost(id: string, title: string, content: string){
    const post:Post = { id: id, title: title, content: content };
    this.http.put("http://localhost:3001/api/posts/" + id, post)
    .subscribe(response => {
      const updatedPosts = [...this.posts];
      const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
      updatedPosts[oldPostIndex] = post;
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(["/"]);
    });
  }

  deletePost(postId: string){
    this.http.delete("http://localhost:3001/api/posts/" + postId)
    .subscribe(() => {
      const updatedPosts = this.posts.filter(post => post.id !== postId);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }
}




