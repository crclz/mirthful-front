import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { QDiscussion, TopicService, QTopic } from 'src/openapi';
import { filter, switchMap, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-discussion-home',
  templateUrl: './discussion-home.component.html',
  styleUrls: ['./discussion-home.component.scss']
})
export class DiscussionHomeComponent implements OnInit {

  wordModel = '';

  keyword$: Subject<string> = new Subject<string>();

  discussions$: Observable<QDiscussion[]>;

  topics$: Observable<QTopic[]>;

  constructor(
    private topicApi: TopicService
  ) { }

  ngOnInit(): void {
    this.discussions$ = this.keyword$.pipe(
      filter(kw => kw != null && kw.trim() != ''),
      switchMap(word => this.topicApi.searchDiscussions(word, 0)),
      shareReplay(1)
    )

    this.topics$ = this.keyword$.pipe(
      filter(kw => kw != null && kw.trim() != ''),
      switchMap(word => this.topicApi.searchTopics(word, false, 0)),
      shareReplay(1)
    )
  }

  search(keyWord: string) {
    this.keyword$.next(keyWord);
  }

}
