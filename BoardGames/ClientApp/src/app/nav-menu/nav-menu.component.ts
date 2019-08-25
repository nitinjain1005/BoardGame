import { Component } from '@angular/core';
import { LoginService } from '../shared/login/login.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NotificationService } from 'src/app/shared/alert/notification.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})

export class NavMenuComponent {
  constructor(public login: LoginService, private router: Router, private formBuilder: FormBuilder,
    private notificationService: NotificationService) { }
  isExpanded = false;
  public errorMessage = '';
  public isLogin = false;
  public LoginUser = '';
  public UserId = '';
  public Password = '';
  loginForm: FormGroup;
  submitted = false;

  // Function to log in
  Login() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    const userName = this.UserId;
    const password = this.Password;
    this.login.LoginIn(userName, password).subscribe(data => {
      this.isLogin = true;
      this.LoginUser = localStorage.getItem('userName');
      this.notificationService.success('Login Successfull !');
      this.router.navigate(['/admin-view']
      );
    }, error => {
      this.errorMessage = 'Wrong User name/ password ! ';
      console.log(error.message);
      this.notificationService.warn(this.errorMessage);
      // this.loading = false;
    });
  }

  // Function to log out
  LogOut() {
    this.login.logout();
    this.isLogin = false;
    this.router.navigate(['/visitor-rating']);
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      UsrId: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
}
export interface TokenParams {
  token: string;
  expiration: string;
}
