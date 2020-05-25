import { Component, OnInit, Input } from '@angular/core';
import { QPost } from 'src/openapi';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  @Input('posts')
  posts: QPost[];

  constructor() { }

  ngOnInit(): void {
  }

}
