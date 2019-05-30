import {Component, OnChanges, OnInit} from '@angular/core';
import {EventService, IEvent, ISession} from '../shared';
import {ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: './event-details.component.html',
  styles: [`
    .container {
      padding-left: 20px;
      padding-right: 20px;
    }

    .event-image {
      height: 100px;
    }

    a {
      cursor: pointer
    }
  `]
})

export class EventDetailsComponent implements OnInit, OnChanges {
  event: IEvent;
  addMode: boolean;
  filterBy = 'all';
  sortBy = 'votes';

  constructor(private eventService: EventService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.data.forEach((data) => {
      this.event = data['event'];
      this.addMode = false;
    });
  }

  addSession() {
    this.addMode = true;
  }

  saveNewSession(session: ISession) {
    const nextId = Math.max.apply(null, this.event.sessions
      .map(s => s.id));

    session.id = nextId + 1;
    this.event.sessions.push(session);
    this.eventService.updateEvent(this.event);
    this.addMode = false;
  }

  cancelAddSession() {
    this.addMode = false;
  }

  ngOnChanges() {
  }
}
