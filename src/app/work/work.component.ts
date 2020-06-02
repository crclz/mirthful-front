import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkService, QWork, QTopic, TopicService } from 'src/openapi';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {

  @Input('workId$')
  workId$: Observable<string>;

  work$: Observable<QWork>;

  relatedTopics$: Observable<QTopic[]>;
  relatedGroups$: Observable<QTopic[]>;

  constructor(
    private workApi: WorkService,
    private route: ActivatedRoute,
    private topicApi: TopicService
  ) { }

  ngOnInit(): void {
    if (this.workId$ == null) {
      this.workId$ = this.route.paramMap.pipe(map(pm => pm.get('workId')));
    }

    this.work$ = this.workId$.pipe(
      switchMap(id => this.workApi.getWorkById(id)),
      shareReplay(1)
    )

    this.relatedTopics$ = this.workId$.pipe(
      switchMap(id => this.topicApi.queryTopics(id, false)),
      shareReplay(1)
    );

    this.relatedGroups$ = this.workId$.pipe(
      switchMap(id => this.topicApi.queryTopics(id, true)),
      shareReplay(1)
    );
  }

}
