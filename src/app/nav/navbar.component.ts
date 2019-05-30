import {Component} from '@angular/core';
import {AuthService} from '../user/auth.service';
import {EventService, ISession} from '../events/shared';

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styles: [`
    .nav.navbar-nav {
      font-size: 15px;
    }

    #searchForm {
      margin-right: 100px
    }

    @media (max-width: 800px) {
      #searchForm {
        display: none
      }
    }

    li > a.active {
      color: #F97924
    }
  `]
})

export class NavbarComponent {
  searchTerm = '';
  foundSessions: ISession[];

  constructor(private authService: AuthService,
              private eventService: EventService) {
  }

  searchSessions(searchTerm) {
    this.eventService.searchSessions(searchTerm).subscribe(sessions => {
      this.foundSessions = sessions;
      }
    );
  }
}
