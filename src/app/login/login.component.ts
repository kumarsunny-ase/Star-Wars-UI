import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../Service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.api.login(this.loginForm.value)
      .subscribe({
        next:(response)=> {
          alert(response.message)
          this.loginForm.reset();
          this.router.navigate(['/admin/search'])
        }, error: (err) => {
          alert(err?.error.message)
        }
      })


    } else {
      console.log('Form is not valid');
    }
  }
}
