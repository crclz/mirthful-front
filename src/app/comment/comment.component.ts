import { Component, OnInit, Input } from '@angular/core';
import { WorkService, CommentsService, QComment, OrderByType, CreateCommentModel } from 'src/openapi';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, shareReplay, take, filter, tap, startWith, debounce, debounceTime } from 'rxjs/operators';
import { Observable, combineLatest, Subject, ReplaySubject, of, BehaviorSubject } from 'rxjs';
import { QWork } from 'src/openapi/model/qWork';
import { FormGroup, FormBuilder, Validators as V } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NotificationService } from '../notification.service';
import { AuthenticationService } from '../authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { ReportDialogComponent } from '../report-dialog/report-dialog.component';
import { PageEvent } from '@angular/material/paginator';
import { ModelHintService } from '../model-hint.service';

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

  order$ = new BehaviorSubject<OrderByType>(OrderByType.Hottest);// remember to initialize
  orderType = OrderByType.Hottest;

  switchOrderType() {
    if (this.orderType != OrderByType.Hottest)
      this.orderType = OrderByType.Hottest;
    else
      this.orderType = OrderByType.Newest;
    this.order$.next(this.orderType);
  }

  page$ = new BehaviorSubject<number>(0);

  onPageChange($event: PageEvent) {
    this.page$.next($event.pageIndex);
  }

  constructor(
    private route: ActivatedRoute,
    private commentApi: CommentsService,
    private noti: NotificationService,
    public auth: AuthenticationService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    public hinter: ModelHintService
  ) {
  }

  ngOnInit(): void {
    this.order$.next(OrderByType.Hottest);

    if (this.workId$ == null) {
      this.workId$ = this.route.paramMap.pipe(map(p => p.get('workId')))
    }

    // this.comments$ = this.workId$.pipe(
    //   switchMap(id => this.commentApi.getByWork(id, OrderByType.Hottest, 0)),
    //   shareReplay(1)
    // )

    this.comments$ = combineLatest(this.workId$, this.order$, this.page$).pipe(
      debounceTime(300),
      switchMap(([workId, order, pageNumber]) => this.commentApi.getByWork(workId, order, pageNumber)),
      shareReplay(1)
    )

    this.commentForm = this.fb.group({
      rating: '',
      title: ['', [V.required, V.minLength(1), V.maxLength(12)]],
      text: ['', [V.required, V.minLength(25), V.maxLength(800)]]
    })
  }

  genlist(k: number) {
    let list = [];
    for (let i = 0; i < k; i++) {
      list.push(i);
    }
    return list;
  }

  // comment form
  commentForm: FormGroup;

  rawValue(x: number) {
    return x;
  }

  createComment(data) {
    this.workId$.pipe(
      switchMap(workId => this.commentApi.createComment({
        workId: workId,
        title: data.title,
        text: data.text,
        rating: data.rating
      }))
    ).subscribe(() => {
      this.commentForm.reset();
      this.noti.ok("评论成功！")
    }, p => this.noti.error(p))
  }

  expressAttitude(comment: QComment, agree: boolean) {
    if (comment.myAttitude == agree)
      agree = null;

    this.auth.me$.pipe(
      take(1),
      tap(user => { if (user == null) { this.noti.push('你还未登录') } else { console.log("uuu", user) } }),
      filter(user => user != null),
      switchMap(user => this.commentApi.expressAttitude(comment.id, agree)),
      take(1)
    ).subscribe(() => {
      this.noti.ok("操作成功");
      let agreeDelta = 0;
      let disagreeDelta = 0;
      if (comment.myAttitude == true && agree != true)
        agreeDelta = -1;
      if (comment.myAttitude != true && agree == true)
        agreeDelta = 1;
      if (comment.myAttitude == false && agree != false)
        disagreeDelta = -1;
      if (comment.myAttitude != false && agree == false)
        disagreeDelta = 1;

      comment.agreeCount += agreeDelta;
      comment.disagreeCount += disagreeDelta;
      comment.myAttitude = agree;
    }, p => this.noti.error(p));
  }

  openReportDialog(commentId: string) {
    const dialogRef = this.dialog.open(ReportDialogComponent, {
      width: '300px',
      data: { commentId$: of(commentId) }
    });
  }
}
