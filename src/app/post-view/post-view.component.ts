import { Component, OnInit, Input } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { QPost, TopicService, QReply } from 'src/openapi';
import { NotificationService } from '../notification.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, switchMap, shareReplay, take } from 'rxjs/operators';
import { ModelHintService } from '../model-hint.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit {

  @Input('postId$')
  postId$: Observable<string>;

  post$: Observable<QPost>;

  replies$: Observable<QReply[]>;

  replyFrom: FormGroup;

  page$ = new BehaviorSubject<number>(0);

  onPageChange($event: PageEvent) {
    this.page$.next($event.pageIndex);
  }

  repliesRefresher$ = new BehaviorSubject<number>(0);

  constructor(
    private topicApi: TopicService,
    private noti: NotificationService,
    private route: ActivatedRoute,
    public auth: AuthenticationService,
    private fb: FormBuilder,
    public hinter: ModelHintService
  ) { }

  ngOnInit(): void {
    if (this.postId$ == null) {
      this.postId$ = this.route.paramMap.pipe(map(m => m.get('postId')));
    }

    this.post$ = this.postId$.pipe(
      switchMap(id => this.topicApi.getPostById(id)),
      shareReplay(1)
    )

    this.replies$ = combineLatest(this.postId$, this.page$, this.repliesRefresher$).pipe(
      switchMap(([id, page]) => this.topicApi.getReplies(id, page)),
      shareReplay(1)
    );

    this.replyFrom = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]]
    })
  }

  sendReply(data) {
    this.postId$.pipe(
      take(1),
      switchMap(id => this.topicApi.sendReply({ postId: id, text: data.text })),
    ).subscribe(() => {
      this.noti.ok("回复成功");
      this.replyFrom.reset();
      this.repliesRefresher$.next(1);
    }, p => this.noti.error(p))
    this.replyFrom.reset();
    console.warn(data)
  }

}
