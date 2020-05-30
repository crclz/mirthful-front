import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { QTopic, QPost, QReply, TopicService } from 'src/openapi';
import { filter, switchMap, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-group-home',
  templateUrl: './group-home.component.html',
  styleUrls: ['./group-home.component.scss']
})
export class GroupHomeComponent implements OnInit {

  wordModel = '';

  keyword$: Subject<string> = new Subject<string>();

  topics$: Observable<QTopic[]>;

  posts$: Observable<QPost[]>;
  replies$: Observable<QReply[]>;

  hotgroups$: Observable<QTopic[]>;

  constructor(
    private topicApi: TopicService
  ) { }

  ngOnInit(): void {
    this.topics$ = this.keyword$.pipe(
      filter(kw => kw != null && kw.trim() != ''),
      switchMap(word => this.topicApi.searchTopics(word, true, 0)),
      shareReplay(1)
    )

    this.posts$ = this.keyword$.pipe(
      filter(kw => kw != null && kw.trim() != ''),
      switchMap(word => this.topicApi.searchPosts(word, 0)),
      shareReplay(1)
    )

    this.replies$ = this.keyword$.pipe(
      filter(kw => kw != null && kw.trim() != ''),
      switchMap(word => this.topicApi.searchReplies(word, 0)),
      shareReplay(1)
    )
  }

  search(keyWord: string) {
    this.keyword$.next(keyWord);
  }

}
