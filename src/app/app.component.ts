import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = '书籍影视交流系统';

  constructor(
    public auth: AuthenticationService
  ) {

  }

  ngOnInit(): void {

  }

  logout(){

  }
}
