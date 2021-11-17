import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/shared/services/snackbar.service';
import { AuthenticationService } from 'src/app/shared/services/user.service';
import { User } from '../../models/user';

interface Gender {
  id: number;
  value: string;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User;
  isSubmitted: boolean;
  signupForm: FormGroup;

  genders: Gender[] = [
    { id: 1, value: 'Male' },
    { id: 2, value: 'Female' },
    { id: 3, value: 'Other' },
  ];
  // userRegistrationForm: any;
  categories: any = [{ id: 1, name: 'Artist' }, { id: 0, name: 'Normal User' }];
  constructor(private formBuilder: FormBuilder,
    private snackbar: SnackBarService,
    private router: Router,
    private authService: AuthenticationService) { }

  //category 0 = normal user, category 1 = artist
  categorySelected: number = 0;
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      gender: ['', Validators.required],
      username: [''],
      dob: ['', Validators.required],
    });
  }

  onSubmit(): false | undefined {

    let userBody = {
      fName: this.signupForm?.value?.firstName,
      lName: this.signupForm?.value?.lastName,
      email: this.signupForm?.value?.email,
      password: this.signupForm?.value?.password,
      gender: this.signupForm?.value?.gender?.id,
      username: this.signupForm?.value?.username,
      dob: this.signupForm?.value?.dob,
      category: this.categorySelected
    }

    this.isSubmitted = true;
    // this.user = { ...this.userRegistrationForm?.value, category: this.category }
    if (!this.signupForm.valid) {
      this.snackbar.showMessage('All fields mandatory except username', '');
      return false;
    } else {
      if (this.signupForm.value?.password !== this.signupForm.value?.confirmPassword) {
        //Confirm password doesn't match
        this.snackbar.showMessage('Confirm password doesn\'t match', '');
        console.log('The passwords dont match');
        return false;
      }
      this.authService.register(userBody).subscribe(data => {
        console.log(JSON.stringify(this.categorySelected));
        console.log(data);
        let currentUser = this.authService.getCurrentUser();
        let role = currentUser.payload.role;
        if (role == 0) {
          this.router.navigateByUrl('/user/dashboard');
        } else {
          console.log('navigate to /artist/dashboard');
          this.router.navigateByUrl('/artist/dashboard');
        }
      });
      return
    }

  }

}
