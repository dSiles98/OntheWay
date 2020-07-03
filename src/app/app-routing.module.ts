import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegisterFormComponent } from './components/user-register-form/user-register-form.component';
import { RecentEventsComponent } from './components/recent-events/recent-events.component';
import { LoginComponent } from './components/login/login.component'
import { AdminComponent } from './components/administrator/admin/admin.component';
import { ModuleWithProviders } from "@angular/core";
import { EventsListComponent } from './components/events-list/events-list.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { CreateEventComponent } from './components/administrator/create-event/create-event.component';
import { CreateAdminComponent } from './components/administrator/create-admin/create-admin.component';
import { ThemeComponent } from './components/theme/theme.component';
import { ThemesListComponent } from './components/themes-list/themes-list.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ChangePasswordComponent } from 'src/app/components/change-password/change-password.component';
import { ForgotMyPasswordComponent } from 'src/app/components/forgot-my-password/forgot-my-password.component';
import { UserComponent } from './components/user/user.component';
import { CreateFacebookEventComponent } from 'src/app/components/create-facebook-event/create-facebook-event.component';
import { DefinePasswordComponent } from './components/define-password/define-password.component';
import { TouristPlacesComponent } from './components/tourist-places/tourist-places.component';
import { CommentComponent } from './components/comment/comment.component';
import { CommentsListComponent } from './components/comments-list/comments-list.component';
import { EventRatingComponent } from './components/event-rating/event-rating.component';
import { PastEventsComponent } from './components/past-events/past-events.component';
import { SiteDetailComponent } from './components/site-detail/site-detail.component';
import { EditSiteComponent } from './components/administrator/edit-site/edit-site.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';


const routes: Routes = [
  { path: '', component: RecentEventsComponent},
  { path: 'login-form', component: LoginComponent },
  { path: 'login-confirm/:key', component: LoginComponent },
  { path: 'user-register-form', component: UserRegisterFormComponent },
  { path: 'forgot-my-password', component: ForgotMyPasswordComponent },
  { path: 'admin-page', component: AdminComponent},
  { path: 'events/:nameCategory', component: EventsListComponent},
  { path: 'create-event', component: CreateEventComponent},
  { path: 'create-admin', component: CreateAdminComponent},
  { path: 'user-page', component: UserComponent},
  { path: 'event-detail/:eventId', component: EventDetailComponent},
  { path: 'themes', component: ThemesListComponent},
  { path: 'change-password/:key', component: ChangePasswordComponent },
  { path: 'calendar/:detail', component: CalendarComponent },
  { path: 'calendar/:detail/:siteId', component: CalendarComponent },
  { path: 'sites', component: TouristPlacesComponent },
  { path: 'user', component: EditUserComponent },
  { path: 'create-facebook-event', component: CreateFacebookEventComponent },
  { path: 'define-password/:key', component: DefinePasswordComponent },
  { path: 'past-event/:preferenceId/:eventId', component: EventRatingComponent },
  { path: 'past-event', component: PastEventsComponent },
  { path: 'site-detail/:siteId', component: SiteDetailComponent },
  { path: 'edit-site/:siteId', component: EditSiteComponent },
];

export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
