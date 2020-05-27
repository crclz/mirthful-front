import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { Subject, Observable } from 'rxjs';
import { QWork, QTopic, QPost, QDiscussion, WorkService, WorkType, TopicService, QComment, CommentsService } from 'src/openapi';
import { shareReplay, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  wordInput = '';
  keyword$ = new Subject<string>();

  books$: Observable<QWork[]>;
  films$: Observable<QWork[]>;

  groups$: Observable<QTopic[]>;
  topics$: Observable<QTopic[]>;

  posts$: Observable<QPost[]>;
  discussions$: Observable<QDiscussion[]>;


  hotBooks$: Observable<QWork[]>;
  hotFilms$: Observable<QWork[]>;
  hotComments$: Observable<QComment[]>;
  hotTopics$: Observable<QTopic[]>;

  constructor(
    public notification: NotificationService,
    private workApi: WorkService,
    private topicApi: TopicService,
    private commentApi: CommentsService
  ) { }

  ngOnInit(): void {
    this.books$ = this.keyword$.pipe(
      switchMap(word => this.workApi.getWorkByKeyword(WorkType.Book, word, 0)),
      shareReplay(1)
    );

    this.films$ = this.keyword$.pipe(
      switchMap(word => this.workApi.getWorkByKeyword(WorkType.Film, word, 0)),
      shareReplay(1)
    );

    this.groups$ = this.keyword$.pipe(
      switchMap(word => this.topicApi.searchTopics(word, true, 0)),
      shareReplay(1)
    );

    this.topics$ = this.keyword$.pipe(
      switchMap(word => this.topicApi.searchTopics(word, false, 0)),
      shareReplay(1)
    );

    this.posts$ = this.keyword$.pipe(
      switchMap(word => this.topicApi.searchPosts(word, 0)),
      shareReplay(1)
    );

    this.discussions$ = this.keyword$.pipe(
      switchMap(word => this.topicApi.searchDiscussions(word, 0)),
      shareReplay(1)
    );


    //#region hot module

    this.hotBooks$ = this.workApi.hotestWorks(WorkType.Book).pipe(shareReplay(1));

    this.hotFilms$ = this.workApi.hotestWorks(WorkType.Film).pipe(shareReplay(1));

    this.hotComments$ = this.commentApi.hotestComments().pipe(shareReplay(1));

    this.hotTopics$ = this.topicApi.hotestTopicsNotGroup().pipe(shareReplay(1));

    //#endregion
  }

  genlist(k: number) {
    let list = [];
    for (let i = 0; i < k; i++) {
      list.push(i);
    }
    return list;
  }

  goSearch(word: string) {
    word = word.trim();
    if (word != '') {
      this.keyword$.next(word);
    }
  }

}
