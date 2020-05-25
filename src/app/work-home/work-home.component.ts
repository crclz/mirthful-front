import { Component, OnInit } from '@angular/core';
import { Observable, Subject, combineLatest } from 'rxjs';
import { WorkType, WorkService, QWork } from 'src/openapi';
import { ActivatedRoute } from '@angular/router';
import { map, shareReplay, withLatestFrom, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-work-home',
  templateUrl: './work-home.component.html',
  styleUrls: ['./work-home.component.scss']
})
export class WorkHomeComponent implements OnInit {

  wordInput = '';
  keyword$ = new Subject<string>();

  workType$: Observable<WorkType>;

  works$: Observable<QWork[]>;

  constructor(
    private route: ActivatedRoute,
    private workApi: WorkService,
  ) { }

  ngOnInit(): void {
    this.workType$ = this.route.queryParamMap.pipe(
      map(pm => pm.get('workType')),
      map(pm => pm == WorkType.Book ? WorkType.Book : WorkType.Film),
      shareReplay(1)
    );

    this.works$ = this.keyword$.pipe(
      withLatestFrom(this.workType$),
      switchMap(([word, workType]) => this.workApi.getWorkByKeyword(workType, word, 0)),
      shareReplay(1)
    );
  }

  goSearch(word: string) {
    word = word.trim();
    if (word != '') {
      this.keyword$.next(word);
    }
  }

}
