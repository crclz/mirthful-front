import { Component, OnInit, Input } from '@angular/core';
import { QWork } from 'src/openapi';

@Component({
  selector: 'app-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.scss']
})
export class WorkListComponent implements OnInit {

  @Input('works')
  works: QWork[];

  constructor() { }

  ngOnInit(): void {
  }

}
