import { Component, OnInit, Input } from '@angular/core';
import { Observable, combineLatest, of } from 'rxjs';
import { TopicService, QTopic, QTopicMember, JoinTopicModel, GroupManageService } from 'src/openapi';
import { NotificationService } from '../notification.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-topic-profile',
  templateUrl: './topic-profile.component.html',
  styleUrls: ['./topic-profile.component.scss']
})
export class TopicProfileComponent implements OnInit {

  @Input('topicId$')
  topicId$: Observable<string>;

  topic$: Observable<QTopic>;

  membership$: Observable<QTopicMember>;

  constructor(
    private topicApi: TopicService,
    private noti: NotificationService,
    private route: ActivatedRoute,
    public auth: AuthenticationService,
    public groupManage: GroupManageService
  ) {

  }

  get me$() {
    return this.auth.me$;
  }

  ngOnInit(): void {
    if (this.topicId$ == null) {
      this.topicId$ = this.route.paramMap.pipe(map(m => m.get('topicId')));
    }

    this.topic$ = this.topicId$.pipe(
      switchMap(id => this.topicApi.getTopicProfile(id)),
      shareReplay(1)
    );

    this.membership$ = combineLatest(this.auth.me$, this.topicId$).pipe(
      switchMap(([me, topicId]) => me == null ? of(null) : this.topicApi.getMembership(topicId)),
      shareReplay(1)
    );
  }

  joinTopic(topicId: string) {
    this.topicApi.joinTopic({ topicId: topicId })
      .subscribe(p => this.noti.ok("加入成功"), p => this.noti.error(p));
  }

  sendBeAdminRequest(topicId: string) {
    this.groupManage.sendAdminRequest({ topicId: topicId, text: 'No content.' })
      .subscribe(() => this.noti.ok("申请成功，等待处理。"), p => this.noti.error(p));
  }

}
