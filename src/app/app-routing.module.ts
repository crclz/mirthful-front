
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CommentComponent } from './comment/comment.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { WorkComponent } from './work/work.component';
import { CreateTopicComponent } from './create-topic/create-topic.component';
import { TopicProfileComponent } from './topic-profile/topic-profile.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { GroupComponent } from './group/group.component';
import { PostViewComponent } from './post-view/post-view.component';
import { DiscussionHomeComponent } from './discussion-home/discussion-home.component';
import { GroupHomeComponent } from './group-home/group-home.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'comment/:workId', component: CommentComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'work/:workId', component: WorkComponent },
  { path: 'create-topic', component: CreateTopicComponent },
  { path: 'topic-profile/:topicId', component: TopicProfileComponent },
  { path: 'discuss/:topicId', component: DiscussionComponent },
  { path: 'group/:topicId', component: GroupComponent },
  { path: 'post-view/:postId', component: PostViewComponent },
  { path: 'discuss-home', component: DiscussionHomeComponent },
  { path: 'group-home', component: GroupHomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
