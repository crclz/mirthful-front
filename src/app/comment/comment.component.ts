import { Component, OnInit, Input } from '@angular/core';
import { WorkService, CommentsService, QComment, OrderByType } from 'src/openapi';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { QWork } from 'src/openapi/model/qWork';

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

}
