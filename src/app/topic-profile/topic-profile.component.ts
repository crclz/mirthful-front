import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { TopicService, QTopic } from 'src/openapi';
import { NotificationService } from '../notification.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-topic-profile',
  templateUrl: './topic-profile.component.html',
  styleUrls: ['./topic-profile.component.scss']
})
export class TopicProfileComponent implements OnInit {

  @Input('topicId$')
  topicId$: Observable<string>;

  topic$: Observable<QTopic>;

  constructor(
    private topicApi: TopicService,
    private noti: NotificationService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    if (this.topicId$ == null) {
      this.topicId$ = this.route.paramMap.pipe(map(m => m.get('topicId')));
    }

    this.topic$ = this.topicId$.pipe(
      switchMap(id => this.topicApi.getTopicProfile(id)),
      shareReplay(1)
    );
  }

}
