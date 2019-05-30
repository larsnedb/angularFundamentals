import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {
  EventsListComponent,
  EventThumbnailComponent,
  EventService,
  EventListResolver,
  EventDetailsComponent,
  CreateEventComponent,
  CreateSessionComponent,
  SessionListComponent,
  UpvoteComponent,
  VoterService,
  LocationValidator,
  EventResolver,
  DurationPipe
} from './events';

import {EventsAppComponent} from './events-app.component';
import {NavbarComponent} from './nav/navbar.component';
import {JQ_TOKEN,
  TOASTR_TOKEN,
  Toastr,
  CollapsibleWellComponent,
  SimpleModalComponent,
  ModalTriggerDirective} from './common';
import {RouterModule} from '@angular/router';
import {appRoutes} from './routes';
import {Error404Component} from './errors/404.component';
import {AuthService} from './user/auth.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const toastr: Toastr = window['toastr'];
const jQuery = window['$'];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    CreateEventComponent,
    NavbarComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    UpvoteComponent,
    CollapsibleWellComponent,
    SimpleModalComponent,
    ModalTriggerDirective,
    LocationValidator,
    DurationPipe,
  ],
  providers: [
    EventService,
    { provide: TOASTR_TOKEN, useValue: toastr},
    { provide: JQ_TOKEN, useValue: jQuery},
    AuthService,
    EventResolver,
    EventListResolver,
    VoterService,
    {provide: 'canDeactivateCreateEvent', useValue: checkDirtyState}],
  bootstrap: [EventsAppComponent]
})
export class AppModule {
}

export function checkDirtyState(component: CreateEventComponent) {
  if (component.isDirty) {
    return window.confirm('You have not saved this event, do you really want to cancel?');
  }
  return true;
}
