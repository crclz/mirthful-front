import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UsersService } from 'src/openapi';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { RegisterModel } from 'src/openapi/model/registerModel'
import { NotificationService } from '../notification.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form = new FormGroup({});
  model: RegisterModel = { username: '', password: '', description: '', nickname: '' }

  fields: FormlyFieldConfig[] = [
    {
      key: 'username',
      type: 'input',
      templateOptions: {
        label: '用户名',
        minLength: 3,
        maxLength: 12,
        required: true,
        attributes: {
          autocomplete: 'off'
        }
      }
    }, {
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: '密码',
        minLength: 6,
        maxLength: 32,
        required: true
      }
    }, {
      key: 'nickname',
      type: 'input',
      templateOptions: {
        label: '昵称',
        minLength: 1,
        maxLength: 16,
        required: true,
        attributes: {
          autocomplete: 'off'
        }
      }
    }, {
      key: 'description',
      type: 'input',
      templateOptions: {
        label: '个人简介',
        maxLength: 32,
        attributes: {
          autocomplete: 'off'
        }
      }
    }
  ];

  constructor(
    private userApi: UsersService,
    private noti: NotificationService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  submit() {
    this.userApi.register(this.model).subscribe(() => {
      this.noti.ok("注册成功");
      setTimeout(() => {
        this.router.navigate(['/home'])
      }, 2000);
    }, p => this.noti.error(p));
  }

}
