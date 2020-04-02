import { Component, OnInit, Input } from '@angular/core';
import { WorkService, CommentsService, QComment, OrderByType, CreateCommentModel } from 'src/openapi';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { QWork } from 'src/openapi/model/qWork';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input("workId$")
  workId$: Observable<string>;

  comments$: Observable<QComment[]>;

  myAttitude: number = 1;

  constructor(
    private route: ActivatedRoute,
    private commentApi: CommentsService,
    private noti: NotificationService
  ) {
  }

  ngOnInit(): void {
    if (this.workId$ == null) {
      this.workId$ = this.route.paramMap.pipe(map(p => p.get('workId')))
    }

    this.comments$ = this.workId$.pipe(
      switchMap(id => this.commentApi.getByWork(id, OrderByType.Hottest, 0)),
      shareReplay(1)
    )
  }

  genlist(k: number) {
    let list = [];
    for (let i = 0; i < k; i++) {
      list.push(i);
    }
    return list;
  }

  // comment form
  commentForm = new FormGroup({});
  commemtModel: CreateCommentModel = {
    workId: '',
    title: '',
    text: '',
    rating: 5,
  }

  commentFields: FormlyFieldConfig[] = [
    {
      key: 'rating',
      type: 'input',
      templateOptions: {
        label: '评分',
        type: 'number',
        step: 1,
        min: 1,
        max: 5,
        required: true
      }
    }, {
      key: 'title',
      type: 'input',
      templateOptions: {
        label: '标题',
        minLength: 1,
        maxLength: 12,
        required: true
      }
    }, {
      key: 'text',
      type: 'input',
      templateOptions: {
        label: '正文',
        minLength: 25,
        maxLength: 800,
        required: true
      }
    }
  ];

  createComment() {

    this.workId$.pipe(
      switchMap(workId => this.commentApi.createComment({
        workId: workId,
        title: this.commemtModel.title,
        text: this.commemtModel.text,
        rating: this.commemtModel.rating
      }))
    ).subscribe(() => {
      this.commemtModel.title = '';
      this.commemtModel.text = '';
      this.noti.ok("评论成功！")
    }, p => this.noti.error(p))

  }
}
