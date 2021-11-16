import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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
  categories: any = [{ id: 1, name: 'Artist' }, { id: 1, name: 'Normal User' }];
  constructor(private formBuilder: FormBuilder) { }

  categorySelected: number = 1;

  // userRegistrationForm: FormGroup = new FormGroup({
  //   firstName: new FormControl('', Validators.required),
  //   lastName: new FormControl('', Validators.required),
  //   email: new FormControl('', Validators.required),
  //   password: new FormControl('', Validators.required),
  //   confirmPassword: new FormControl('', Validators.required),
  //   gender: new FormControl('', Validators.required),
  //   username: new FormControl('', Validators.required),
  //   dob: new FormControl('', Validators.required),
  // });

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
    this.isSubmitted = true;
    // this.user = { ...this.userRegistrationForm?.value, category: this.category }
    if (!this.signupForm.valid) {
      return false;
    } else {
      alert(JSON.stringify(this.categorySelected))
      return
    }

  }

}
