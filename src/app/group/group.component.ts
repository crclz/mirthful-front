import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { QPost, TopicService, QTopicMember, MemberRole, DoAdminModel, AdminAction } from 'src/openapi';
import { NotificationService } from '../notification.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, switchMap, take, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  @Input('topicId$')
  topicId$: Observable<string>;

  posts$: Observable<QPost[]>;

  member$: Observable<QTopicMember>;

  sendPostForm: FormGroup;

  constructor(
    private topicApi: TopicService,
    private noti: NotificationService,
    private route: ActivatedRoute,
    public auth: AuthenticationService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    if (this.topicId$ == null) {
      this.topicId$ = this.route.paramMap.pipe(map(m => m.get('topicId')));
    }

    this.posts$ = this.topicId$.pipe(
      switchMap(id => this.topicApi.getPosts(id, 0)),
      shareReplay(1)
    );

    this.member$ = this.topicId$.pipe(
      switchMap(id => this.topicApi.getMembership(id)),
      shareReplay(1)
    )

    this.sendPostForm = this.fb.group({ title: '', text: '' });
  }

  sendPost(data) {
    this.topicId$.pipe(
      take(1),
      switchMap(id => this.topicApi.sendPost(id, data.title, data.text, null))
    ).subscribe(() => this.noti.ok("发帖成功"), p => this.noti.error(p))
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
