import { Component, OnInit } from '@angular/core';
import { AccessService, LoginModel } from 'src/openapi';
import { NotificationService } from '../notification.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { AuthenticationService } from '../authentication.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private accessApi: AccessService,
    private noti: NotificationService,
    private router: Router,
    private auth: AuthenticationService,
    public dialogRef: MatDialogRef<LoginComponent>,
  ) { }

  form = new FormGroup({});

  model: LoginModel = { username: '', password: '' };

  fields: FormlyFieldConfig[] = [
    {
      key: 'username',
      type: 'input',
      templateOptions: {
        label: '用户名',
        maxLength: 32,
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
        maxLength: 100,
        required: true
      }
    }];

  ngOnInit(): void {
  }

  login() {
    this.accessApi.login(this.model).subscribe(() => {
      this.noti.ok("登录成功!");
      this.dialogRef.close();
      this.auth.refresh();
    }, p => this.noti.error(p))
  }

}
