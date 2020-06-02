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
import { BASE_PATH } from 'src/openapi';
import { PostListComponent } from './group-home/post-list/post-list.component';
import { TopicListComponent } from './topic-list/topic-list.component';
import { WorkHomeComponent } from './work-home/work-home.component';
import { WorkListComponent } from './work-home/work-list/work-list.component';
import { DiscussionListComponent } from './discussion-home/discussion-list/discussion-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { OrderTypePipe } from './order-type.pipe';
import { WorkTypePipe } from './work-type.pipe';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';

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
    GroupHomeComponent,
    PostListComponent,
    TopicListComponent,
    WorkHomeComponent,
    WorkListComponent,
    DiscussionListComponent,
    OrderTypePipe,
    WorkTypePipe
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
    FormsModule,
    MatTabsModule,
    MatDividerModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatSliderModule
  ],
  providers: [{ provide: BASE_PATH, useValue: '' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
