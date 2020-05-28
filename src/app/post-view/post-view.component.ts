import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { QPost, TopicService, QReply } from 'src/openapi';
import { NotificationService } from '../notification.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, switchMap, shareReplay, take } from 'rxjs/operators';
import { ModelHintService } from '../model-hint.service';

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

    this.replies$ = this.postId$.pipe(
      switchMap(id => this.topicApi.getReplies(id, 0)),
      shareReplay(1)
    )

    this.replyFrom = this.fb.group({
      text: ['', [Validators.required, Validators.maxLength(120)]]
    })
  }

  sendReply(data) {
    this.postId$.pipe(
      take(1),
      switchMap(id => this.topicApi.sendReply({ postId: id, text: data.text })),
    ).subscribe(() => this.noti.ok("回复成功"), p => this.noti.error(p))
    this.replyFrom.reset();
    console.warn(data)
  }

}
