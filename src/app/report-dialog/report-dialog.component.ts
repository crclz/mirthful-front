import { Component, OnInit, Input, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { ReportModel, CommentsService } from 'src/openapi';
import { FormlyField, FormlyFieldConfig } from '@ngx-formly/core';
import { NotificationService } from '../notification.service';
import { Router } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.scss']
})
export class ReportDialogComponent implements OnInit {

  commentId$: Observable<string>;

  reportForm = new FormGroup({});
  model = { title: '', text: '' };

  fields: FormlyFieldConfig[] = [
    {
      key: 'title',
      type: 'input',
      templateOptions: {
        label: '标题',
        minLength: 1,
        maxLength: 16,
        required: true
      }
    },
    {
      key: 'text',
      type: 'input',
      templateOptions: {
        label: '举报原因',
        minLength: 15,
        maxLength: 800,
        required: true
      }
    }
  ]

  constructor(
    private commentApi: CommentsService,
    private noti: NotificationService,
    private router: Router,
    public dialogRef: MatDialogRef<ReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReportDialogData
  ) {
    this.commentId$ = data.commentId$;
  }

  ngOnInit(): void {
  }

  submitReport() {
    this.commentId$.pipe(
      switchMap(id => this.commentApi.report({ commentId: id, title: this.model.title, text: this.model.text })),
      take(1)
    ).subscribe(() => this.noti.ok("成功发送举报"), p => this.noti.error(p))
    this.dialogRef.close();
  }

}

interface ReportDialogData {
  commentId$: Observable<string>;
}