import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    // private alertService: AlertService
  ) {
    // redirect to home if already logged in

    console.log('Trying to go to login screen????')
      if (localStorage.getItem('currentUser')) {
      if (this.authenticationService.getRole() == 0)
        this.router.navigate(['/user/dashboard']);
      else
        this.router.navigate(['/artist/dashboard']);

    }
    // }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log(this.loginForm.controls["email"].value);

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    const val = this.loginForm.value;
    if (val.email && val.password) {
      this.authenticationService.login(val.email, val.password)
        .subscribe(
          (data) => {
            console.log(data);
            console.log("User is logged in");
            let currentUser = this.authenticationService.getCurrentUser();
            console.log(currentUser);
            let role = currentUser.payload.role;
            if (role == 1) {
              this.router.navigateByUrl('/artist/dashboard');
            } else {
              this.router.navigateByUrl('/user/dashboard');
            }
          }
        );
    }


    // this.loading = true;
    // this.authenticationService.login(this.loginForm.controls["email"].value, this.loginForm.controls["password"].value)
    //   // .pipe(first())
    //   .subscribe(
    //     data => {
    //       console.log(data);
    //       console.log(this.returnUrl);
    //       this.router.navigate([this.returnUrl]);
    //     });
    //   error => {
    //     this.alertService.error(error);
    //     this.loading = false;
    //   });
  }

}
