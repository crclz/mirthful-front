import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { CreateTopicModel, TopicService } from 'src/openapi';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DisposableComponent } from '../disposable-component';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.scss']
})
export class CreateTopicComponent extends DisposableComponent {

  @Input('workId$')
  workId$: Observable<string>;

  form = new FormGroup({});
  model: CreateTopicModel = { isGroup: false, name: '', description: '', relatedWork: '' }

  fields: FormlyFieldConfig[] = [
    {
      key: 'isGroup',
      type: 'checkbox',
      templateOptions: {
        label: '是否是讨论组',
        required: true
      }
    }, {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: '名称',
        minLength: 1,
        maxLength: 20,
        required: true
      }
    }, {
      key: 'description',
      type: 'input',
      templateOptions: {
        label: '描述',
        minLength: 3,
        maxLength: 320,
        required: true
      }
    }, {
      key: 'relatedWork',
      type: 'input',
      templateOptions: {
        label: '作品id',
        required: false
      }
    }
  ]

  constructor(
    private topicApi: TopicService,
    private route: ActivatedRoute,
    private noti: NotificationService
  ) {
    super()
  }

  ngOnInit(): void {
    if (this.workId$ == null) {
      this.workId$ = this.route.queryParamMap.pipe(
        map(pm => pm.get('workId') != null ? pm.get('workId') : '')
      )
    }

    this.addToSubscriptions(
      this.workId$.subscribe(id => this.model.relatedWork = id)
    );
  }

  createTopic() {
    // let data = {
    //   name: this.model.name,
    //   description: this.model.description,
    //   isGroup: this.model.isGroup,
    //   relatedWork: this.model.relatedWork
    // };

    // get snapshot
    let data = Object.assign({}, this.model);

    if (data.relatedWork.trim() == '') {
      data.relatedWork = null;
    }

    // TODO: redirect
    this.topicApi.createTopic(data).subscribe(res => this.noti.ok("成功创建Topic"), res => this.noti.error(res));
  }

}
