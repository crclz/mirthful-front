import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { TopicService, QPost, QDiscussion, SendDiscussionModel, QTopic } from 'src/openapi';
import { NotificationService } from '../notification.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { map, switchMap, take, shareReplay, withLatestFrom } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-topic',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent implements OnInit {

  @Input('topicId$')
  topicId$: Observable<string>;

  topic$: Observable<QTopic>;

  discussions$: Observable<QDiscussion[]>;

  discussForm: FormGroup;

  image: File;

  constructor(
    private topicApi: TopicService,
    private noti: NotificationService,
    private route: ActivatedRoute,
    public auth: AuthenticationService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    if (this.topicId$ == null) {
      this.topicId$ = this.route.paramMap.pipe(map(m => m.get('topicId')));
    }

    this.topic$ = this.topicId$.pipe(
      switchMap(id => this.topicApi.getTopicProfile(id)),
      shareReplay(1)
    );

    this.discussions$ = this.topicId$.pipe(
      switchMap(id => this.topicApi.getDiscussions(id, 0)),
      shareReplay(1)
    );

    this.discussForm = this.fb.group({ text: '' });
  }

  onFileChange(event) {
    let imageInput = (event.target as HTMLInputElement);
    this.image = imageInput.files.length == 0 ? null : imageInput.files[0];
  }

  sendPost(data) {
    console.log(data)
    let text = data.text;
    text = text == null ? '' : text;
    text = text.trim();

    if (text == '' && this.image == null) {
      this.noti.push("不能发送空的讨论")
      return;
    }



    // TODO: How to catch error?
    let a$;

    if (this.image != null) {
      let fd = new FormData();
      fd.append('image', this.image)

      a$ = this.topicApi.uploadFile(this.image).pipe(
        withLatestFrom(this.topicId$),
        switchMap(([res, topicId]) => this.topicApi.sendDiscussion({ topicId: topicId, text: text, imageUrl: res.url })),
        take(1)
      );
    } else {
      a$ = this.topicId$.pipe(
        switchMap(topicId => this.topicApi.sendDiscussion({ topicId: topicId, text: text, imageUrl: null })),
        take(1)
      );
    }
    a$.subscribe(() => this.noti.ok("发送成功"), p => this.noti.error(p));
    this.discussForm.reset();
  }

}
