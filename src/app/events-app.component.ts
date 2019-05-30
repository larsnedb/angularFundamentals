import {Component, OnInit} from '@angular/core';
import {AuthService} from './user/auth.service';
import {EventService, IEvent} from './events/shared';

@Component({
  selector: 'events-app',
  template: `
    <nav-bar [events]="events"></nav-bar>
    <router-outlet></router-outlet>
  `
})
export class EventsAppComponent implements OnInit {

  constructor(private auth: AuthService, private eventService: EventService) { }

  events: IEvent[];

  ngOnInit() {
    this.auth.checkAuthenticationStatus();
    this.eventService.getEvents().subscribe(data => {
      this.events = data;
    });
  }

}
