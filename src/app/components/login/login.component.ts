import { ToastrService } from 'ngx-toastr';
import { LoginModel } from './../../models/requestModels/loginModel';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control("", [Validators.required]),
      password: this.formBuilder.control("", [Validators.required]),
    });
  }

  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      let loginModel = this.loginForm.value as LoginModel;

      this.authService.login(loginModel).subscribe({
        next: response => {
          console.log(response);
          this.toastr.info(response.message);
          localStorage.setItem("token", response.data.token);
        },
        error: errorResponse => {
          console.log(errorResponse);
          this.toastr.error(errorResponse.error.message);
        }
      });
    }
  }
}
