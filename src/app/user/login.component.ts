import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';

@Component({
  templateUrl: './login.component.html',
  styles: [`
    em {
      float: right;
      color: #E05C65;
      padding-left: 10px
    }
  `]
})


export class LoginComponent {
  userName;
  password;
  mouserOverLogin: boolean;
  loginInvalid = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  login(loginForm) {
    this.authService.loginUser(loginForm.userName, loginForm.password)
      .subscribe(resp => {
        if (!resp) {
          this.loginInvalid = true;
        } else {
          this.router.navigate(['events']);
        }
      });
  }

  cancel() {
    this.router.navigate(['events']);
  }

  logout() {

  }
}
