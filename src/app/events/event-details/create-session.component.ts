import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ISession, restrictedWords} from '../shared';
import {Router} from '@angular/router';

@Component({
  templateUrl: './create-session.component.html',
  styles: [`
    em {
      float: right;
      color: #E05C65;
      padding-left: 10px;
    }

    .error input, .error select, .error textarea {
      background-color: #E3C3C5;
    }
  `]
})

export class CreateSessionComponent implements OnInit {

  constructor(private route: Router) {
  }

  newSessionForm: FormGroup;
  name: FormControl;
  presenter: FormControl;
  duration: FormControl;
  level: FormControl;
  abstract: FormControl;

  ngOnInit() {
    this.name = new FormControl('', Validators.required);
    this.presenter = new FormControl('', Validators.required);
    this.duration = new FormControl('', Validators.required);
    this.level = new FormControl('', Validators.required);
    this.abstract = new FormControl('',
      [
        Validators.required,
        Validators.maxLength(400),
        restrictedWords(['foo', 'bar'])
      ]);

    this.newSessionForm = new FormGroup({
      name: this.name,
      presenter: this.presenter,
      duration: this.duration,
      level: this.level,
      abstract: this.abstract

    });
  }


  saveSession(sessionForm) {
    const session: ISession = {
      id: undefined,
      name: sessionForm.name,
      duration: +sessionForm.duration,
      level: sessionForm.level,
      presenter: sessionForm.presenter,
      abstract: sessionForm.abstract,
      voters: []
    };
    console.log(sessionForm);

  }

  cancel() {
    this.route.navigate(['events']);
  }
}
