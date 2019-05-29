import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Component({
  templateUrl: './profile.component.html',
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

export class ProfileComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) {
  }

  profileForm: FormGroup;

  private firstName: FormControl;
  private lastName: FormControl;

  ngOnInit() {
    this.firstName = new FormControl(this.auth.currentUser.firstName,
      [
        Validators.required,
        Validators.pattern('[a-zA-Z].*')
      ]);
    this.lastName = new FormControl(this.auth.currentUser.lastName,
      [
        Validators.required,
        Validators.minLength(3)
      ]);

    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    });
  }

  cancel() {
    this.router.navigate(['events']);
  }

  saveProfile(formValues) {
    if (this.profileForm.valid) {
      this.auth.updateCurrentUser(formValues.firstName, formValues.lastName);
      this.router.navigate(['events']);
    }
  }

  validateLastName() {
    return this.lastName.valid || this.lastName.untouched;
  }

    validateFirstName() {
    return this.firstName.valid || this.firstName.untouched;
  }
}
