import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Post } from 'src/app/shared/interfaces';
import { PostService } from 'src/app/shared/post.service';
import { environment } from 'src/environments/environment';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[]=[]
  pSub: Subscription
  dSub: Subscription

  searchStr = ''

  constructor(private postService: PostService, private alert:AlertService) { }
  ngOnDestroy(): void {
    if(this.pSub){
      this.pSub.unsubscribe()
    }
    if(this.dSub){
      this.dSub.unsubscribe()
    }
  }
  

  ngOnInit(): void {
    this.pSub = this.postService.getAll().subscribe( posts=>{
      this.posts = posts
      console.log(posts)
    })
  }

  remove(id:string){
    this.dSub = this.postService.remove(id).subscribe(()=>{
      this.posts = this.posts.filter( post => post.id !== id)
      this.alert.warning("Post has been deleted.")
    })
  }

}
