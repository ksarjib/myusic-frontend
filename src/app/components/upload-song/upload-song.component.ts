import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Event, Router } from '@angular/router';
import { MusicService } from 'src/app/shared/services/music.service';
import { SnackBarService } from 'src/app/shared/services/snackbar.service';
import { AuthenticationService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-upload-song',
  templateUrl: './upload-song.component.html',
  styleUrls: ['./upload-song.component.css']
})
export class UploadMusicComponent implements OnInit {

  uploadForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  formData: FormData;
  music: any;
  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private musicService: MusicService,
    private authService: AuthenticationService,
    public fb: FormBuilder,
    private snackbar: SnackBarService,
  ) {
    this.uploadForm = this.fb.group({
      img: [null]
    })
  }

  uploadMusic(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // console.log(file);
      this.formData.append("music", file);
    }
  }

  onSubmit() {
    if (this.uploadForm.invalid) {
      this.snackbar.showMessage('All fields mandatory', '');
      return;
    }
    console.log(this.formData);
    this.formData.append("title", this.uploadForm.get('title')?.value);
    this.formData.append("description", this.uploadForm.get('description')?.value);
    this.formData.append("genre", this.uploadForm.get('genre')?.value);
    this.formData.append("stageName", this.authService.getStageName() || '');
    this.formData.append("artist_id", this.authService.getCurrentUserId());
    this.musicService.uploadMusic(this.formData).subscribe(
      (data) => {
        console.log(data);
        console.log("User is logged in");
        let currentUser = this.authService.getCurrentUser();
        console.log(currentUser);
        let role = currentUser.payload.role;
        this.snackbar.showMessage('Song uploaded successfully', '');
        this.router.navigateByUrl('/artist/dashboard');
      }
    )
  }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      genre: ['', Validators.required],
      music: ['', Validators.required]
    });
    this.formData = new FormData();
  }

  // convenience getter for easy access to form fields
  get f() { return this.uploadForm.controls; }

}
