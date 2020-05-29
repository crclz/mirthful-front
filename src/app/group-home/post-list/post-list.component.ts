import { Component, OnInit, Input } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { QPost, TopicService, QTopicMember, MemberRole, DoAdminModel, AdminAction, QTopic } from 'src/openapi';
import { NotificationService } from '../../notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, switchMap, take, shareReplay, debounceTime } from 'rxjs/operators';
import { ModelHintService } from '../../model-hint.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  @Input('posts')
  posts: QPost[];

  @Input('showActions')
  showActions: boolean = false;

  @Input('member')
  member: QTopicMember;

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
  }


  setPinned(postId: string, status: boolean) {
    this.topicApi.doAdmin({ postId: postId, action: AdminAction.IsPinned, status: status })
      .subscribe(() => this.noti.ok("操作成功"), p => this.noti.error(p));
  }

  setEssence(postId: string, status: boolean) {
    this.topicApi.doAdmin({ postId: postId, action: AdminAction.IsEssence, status: status })
      .subscribe(() => this.noti.ok("操作成功"), p => this.noti.error(p));
  }

  setRemove(postId: string, status: boolean) {
    this.topicApi.doAdmin({ postId: postId, action: AdminAction.Remove, status: status })
      .subscribe(() => this.noti.ok("操作成功"), p => this.noti.error(p));
  }

}
