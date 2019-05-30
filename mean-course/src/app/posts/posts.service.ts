import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject }from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";


@Injectable({providedIn: "root"})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{posts: Post[], postCount: number}>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(postsPerPage: number, currentPage: number){
    // [] is square brackets, take three dots to take all the elements of another array, pull them out of that array and add them to the new array
    // make a full copy of array
    // return [...this.posts];

    // connect to backend
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ messsage: string; posts: any, maxPosts: number }>('http://localhost:3001/api/posts' + queryParams)
      .pipe(
        map(postData => {
        return { posts: postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id,
            imagePath: post.imagePath
          };
        }), maxPosts: postData.maxPosts};
      })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string){
    return this.http.get<{ _id: string, title: string, content: string, imagePath: string }>(
      "http://localhost:3001/api/posts/" + id
    );
  }

  addPost(title: string, content: string, image: File ){
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);
    this.http
    .post<{ message: string; post: Post }>(
      'http://localhost:3001/api/posts',
      postData
    )
    .subscribe(responseData => {
      this.router.navigate(["/"]);
    });
  }

  updatePost(id: string, title: string, content: string, image: File | string){
    let postData: Post | FormData;
    if (typeof image === 'object') {
      postData = new FormData();
      postData.append("id",id);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image, title);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image
      };
    }
    this.http
    .put("http://localhost:3001/api/posts/" + id, postData)
    .subscribe(response => {
      this.router.navigate(["/"]);
    });
  }

  deletePost(postId: string){
    return this.http
      .delete("http://localhost:3001/api/posts/" + postId);
  }
}




