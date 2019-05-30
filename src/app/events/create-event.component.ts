import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {EventService, IEvent} from './shared';


@Component({
  templateUrl: './create-event.component.html',
  styles: [`
    em {
      float: right;
      color: #E05C65;
      padding-left: 10px;
    }

    .error input {
      background-color: #E3C3C5;
    }
  `]
})

export class CreateEventComponent {
  newEvent: IEvent;

  isDirty = true;

  constructor(private router: Router, private eventService: EventService) { }

  cancel() {
    this.router.navigate(['/events']);
  }

  saveEvent(formValues) {
    this.eventService.saveEvent(formValues);
    this.isDirty = false;
    this.router.navigate(['/events']);
  }
}
