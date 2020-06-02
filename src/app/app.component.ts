import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = '书籍影视交流系统';

  constructor(
    public auth: AuthenticationService,
    private titleService: Title
  ) {

  }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }

  logout() {

  }
}
