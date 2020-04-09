import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { TopicService, QPost } from 'src/openapi';
import { NotificationService } from '../notification.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { map, switchMap, take } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {

  @Input('topicId$')
  topicId$: Observable<string>;

  posts$: Observable<QPost[]>;

  postForm: FormGroup;

  image: any;

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

    this.posts$ = this.topicId$.pipe(
      switchMap(id => this.topicApi.getPosts(id, 0, true))
    );

    this.postForm = this.fb.group({
      text: '',
      image: ''
    })
  }

  onFileChange(event) {
    let imageInput = (event.target as HTMLInputElement);
    this.image = imageInput.files.length == 0 ? null : imageInput.files[0];
  }

  sendPost() {
    let fd = new FormData();
    fd.append('text', this.postForm.value.text)
    if (this.image != null)
      fd.append('image', this.image)

    this.topicId$.pipe(
      take(1),
      switchMap(topicId => this.topicApi.sendPost(topicId, null, this.postForm.value.text, this.image))
    ).subscribe(() => this.noti.ok("发送成功"), p => this.noti.error(p));
  }

}
