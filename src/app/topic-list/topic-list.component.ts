import { Component, OnInit, Input } from '@angular/core';
import { QTopic } from 'src/openapi';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent implements OnInit {

  @Input('topics')
  topics: QTopic[];

  constructor() { }

  ngOnInit(): void {
  }

}
