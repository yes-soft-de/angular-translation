import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  constructor(private router: Router) { }

  ngOnInit() {
  }

  login() {
    if (this.loginForm.get('email').value === 'admin' &&
      this.loginForm.get('password').value === 'admin' ) {
        this.router.navigate(['/home']);
      } else {
        console.log('Failed Login!');
      }
  }
}
