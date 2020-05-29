import { Component, OnInit, Input } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { QPost, TopicService, QTopicMember, MemberRole, DoAdminModel, AdminAction, QTopic } from 'src/openapi';
import { NotificationService } from '../notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, switchMap, take, shareReplay, debounceTime } from 'rxjs/operators';
import { ModelHintService } from '../model-hint.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  @Input('topicId$')
  topicId$: Observable<string>;

  topic$: Observable<QTopic>;

  posts$: Observable<QPost[]>;

  member$: Observable<QTopicMember>;

  sendPostForm: FormGroup;

  page$ = new BehaviorSubject<number>(0);

  onPageChange($event: PageEvent) {
    this.page$.next($event.pageIndex);
  }

  constructor(
    private topicApi: TopicService,
    private noti: NotificationService,
    private route: ActivatedRoute,
    public auth: AuthenticationService,
    private fb: FormBuilder,
    private router: Router,
    public hinter: ModelHintService
  ) { }

  ngOnInit(): void {
    if (this.topicId$ == null) {
      this.topicId$ = this.route.paramMap.pipe(map(m => m.get('topicId')));
    }

    this.topic$ = this.topicId$.pipe(
      switchMap(id => this.topicApi.getTopicProfile(id)),
      shareReplay(1)
    );

    this.posts$ = combineLatest(this.topicId$, this.page$).pipe(
      debounceTime(300),
      switchMap(([id,page]) => this.topicApi.getPosts(id, page)),
      shareReplay(1)
    );

    this.member$ = this.topicId$.pipe(
      switchMap(id => this.topicApi.getMembership(id)),
      shareReplay(1)
    )

    this.sendPostForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(16)]],
      text: ['', [Validators.required, Validators.minLength(25), Validators.maxLength(800)]]
    });
  }

  sendPost(data) {
    this.topicId$.pipe(
      take(1),
      switchMap(id => this.topicApi.sendPost({ topicId: id, title: data.title, text: data.text }))
    ).subscribe(({ id }) => {
      this.noti.ok("发帖成功，已跳转到帖子");
      this.sendPostForm.reset();
      this.router.navigate(['/post-view', id]);
    }, p => this.noti.error(p))
  }

}
