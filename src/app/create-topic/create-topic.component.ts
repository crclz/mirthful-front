import { Component, OnInit, Input } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreateTopicModel, TopicService, QWork, WorkService, CreateCommentModel } from 'src/openapi';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DisposableComponent } from '../disposable-component';
import { ActivatedRoute, Router } from '@angular/router';
import { map, filter, debounceTime, switchMap, shareReplay, distinctUntilChanged } from 'rxjs/operators';
import { NotificationService } from '../notification.service';
import { ModelHintService } from '../model-hint.service';

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.scss']
})
export class CreateTopicComponent extends DisposableComponent {

  @Input('workId$')
  workId$: Observable<string>;

  form: FormGroup;

  alternativeWorks$: Observable<QWork[]>;
  keyword$ = new Subject<string>();

  constructor(
    private topicApi: TopicService,
    private route: ActivatedRoute,
    private noti: NotificationService,
    private workApi: WorkService,
    private fb: FormBuilder,
    public hinter: ModelHintService,
    private router: Router
  ) {
    super()
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      isGroup: [false, [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(300)]],
      relatedWork: ['']
    })

    if (this.workId$ == null) {
      this.workId$ = this.route.queryParamMap.pipe(
        map(pm => pm.get('workId') != null ? pm.get('workId') : '')
      )
    }

    this.addToSubscriptions(
      this.workId$.subscribe(id => this.form.get('relatedWork').setValue(id))
    );

    this.alternativeWorks$ = this.keyword$.pipe(
      filter(w => w != null),
      map(w => w.trim()),
      filter(w => w != ''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(word => this.workApi.getWorkByKeyword(null, word, 0)),
      shareReplay(1)
    );
  }

  createTopic(value: CreateTopicModel) {
    this.topicApi.createTopic(value).subscribe(res => {
      this.noti.ok("成功创建，即将跳转到新建的话题/小组");
      setTimeout(() => {
        this.router.navigate(['/topic-profile', res.id]);
      }, 1500);
    }, res => this.noti.error(res));
  }

}
