import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    private _Authservice: AuthService,
    // private _snackbar: SnackbarService,
    private _route: Router
  ) {}
  LogInFrom!: FormGroup;
  SignUpFrom!: FormGroup;
  IsalredyLogin: boolean = false;

  ngOnInit(): void {
    this.createLogInForm();
    this.createSignUpForm();
  }

  createLogInForm() {
    this.LogInFrom = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }
  createSignUpForm() {
    this.SignUpFrom = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      userRole: new FormControl(null, Validators.required),
    });
  }

  OnSignUp() {
    let singupval = this.SignUpFrom.value;
    console.log(singupval);
    this._Authservice.registretion(singupval).subscribe({
      next: (res:any) => {
        this.SignUpFrom.reset();
        console.log(res);
        this.IsalredyLogin = true;
        // this._snackbar.opensanckbar(res.message);
      },
      error: (err:any) => {
        console.log(err);
        this.IsalredyLogin = false;
        // this._snackbar.opensanckbar(err.error.message);
      },
    });
  }

  onLogIn() {
    let loginpval = this.LogInFrom.value;
    console.log(loginpval);
    this._Authservice.LogIn(loginpval).subscribe({
      next: (res : any) => {
        this.LogInFrom.reset();
        console.log(res);
        this.IsalredyLogin = true;
        // this._snackbar.opensanckbar(res.message);
        this._Authservice.savetoken(res.token);
        this._Authservice.saveuserRole(res.userRole);
        this._route.navigate(['home']);
        this._Authservice.LogInSub$.next(true)
      },
      error: (err: any) => {
        console.log(err);
        // this.IsalredyLogin = false;
        // this._snackbar.opensanckbar(err.error.message);
      },
    });
  }

  

}
