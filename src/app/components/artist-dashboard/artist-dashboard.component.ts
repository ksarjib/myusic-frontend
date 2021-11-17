import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artist-dashboard',
  templateUrl: './artist-dashboard.component.html',
  styleUrls: ['./artist-dashboard.component.css']
})
export class ArtistDashboardComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  loadMyMusics() {
    console.log('Loading musics');
    this.router.navigate(['artist/dashboard']);
  }

  uploadNewMusic() {
    console.log('Upload my musics');
    this.router.navigate(['artist/dashboard/upload']);
  }

}
