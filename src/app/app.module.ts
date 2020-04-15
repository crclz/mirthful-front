import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomeComponent } from './home/home.component';
import { CommentComponent } from './comment/comment.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { leopardMessageOptions } from './valeed';
import { LoginComponent } from './login/login.component';
import { WorkComponent } from './work/work.component';
import { CreateTopicComponent } from './create-topic/create-topic.component';
import { TopicProfileComponent } from './topic-profile/topic-profile.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GroupComponent } from './group/group.component';
import { MatChipsModule } from '@angular/material/chips';
import { PostViewComponent } from './post-view/post-view.component';
import { ReportDialogComponent } from './report-dialog/report-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DiscussionHomeComponent } from './discussion-home/discussion-home.component';
import { GroupHomeComponent } from './group-home/group-home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CommentComponent,
    RegisterComponent,
    LoginComponent,
    WorkComponent,
    CreateTopicComponent,
    TopicProfileComponent,
    DiscussionComponent,
    GroupComponent,
    PostViewComponent,
    ReportDialogComponent,
    DiscussionHomeComponent,
    GroupHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSnackBarModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({ validationMessages: leopardMessageOptions }),
    FormlyMaterialModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
