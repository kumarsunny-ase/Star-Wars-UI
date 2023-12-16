import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../Service/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup

  constructor(private fb: FormBuilder, private api : ApiService) {}


  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]

    })
  }

  onSignUp() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
      this.api.signUp(this.signUpForm.value).subscribe({
        next: (response) => {
          alert(response.message);
        },
        error: (err) => {
          alert(err?.error.message);
        },
      });
    } else {
      console.log('Form is not valid');
    }
  }

}
