import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../Service/api.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.api.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.loginForm.reset();
          // alert(response.message);
          this.api.storeToken(response.token);
          this.toast.success({
            detail: 'SUCCESS',
            summary: response.message,
            duration: 5000,
            position: 'topRight',
          });
         this.router.navigate(['/admin/search']);  
              
        },
        error: (err) => {
          this.toast.error({
            detail: "ERROR",
            summary: "Something went wrong!",
            duration: 5000,
          });       
          console.log(err)
        },
      });
    } else {
      console.log('Form is not valid');
    }
  }
}
