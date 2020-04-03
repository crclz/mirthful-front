import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkService, QWork } from 'src/openapi';
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

  constructor(
    private workApi: WorkService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.workId$ == null) {
      this.workId$ = this.route.paramMap.pipe(map(pm => pm.get('workId')));
    }

    this.work$ = this.workId$.pipe(
      switchMap(id => this.workApi.getWorkById(id)),
      shareReplay(1)
    )
  }

}
