import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { QDiscussion } from 'src/openapi';

@Component({
  selector: 'app-discussion-list',
  templateUrl: './discussion-list.component.html',
  styleUrls: ['./discussion-list.component.scss']
})
export class DiscussionListComponent implements OnInit {

  @Input('discussions')
  discussions: Observable<QDiscussion[]>;

  constructor() { }

  ngOnInit(): void {
  }

}
