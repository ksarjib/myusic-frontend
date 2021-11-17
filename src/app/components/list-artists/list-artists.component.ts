import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ArtistService } from 'src/app/shared/services/artist.service';
import { MusicService } from 'src/app/shared/services/music.service';
import { SubscriptionService } from 'src/app/shared/services/subscription.service';
import { AuthenticationService } from 'src/app/shared/services/user.service';


interface Artist {
  _id: string,
  fName: string,
  lName: string,
  email: string,
  gender: 1,
  username: string,
  password: string,
  category: string,
  dob: string,
  status: string,
}

@Component({
  selector: 'app-list-artists',
  templateUrl: './list-artists.component.html',
  styleUrls: ['./list-artists.component.css']
})
export class ListArtistsComponent implements OnInit {
  ngOnInit(): void {

  }
  artistList: any;
  email: string = '';
  // columns we will show on the table
  public displayedColumns = ['firstName', 'lastName', 'stageName', 'action'];
  //the source where we will get the data
  public dataSource = new MatTableDataSource();

  // private _dataStream = new ReplaySubject<PeriodicElement[]>();

  constructor(private artistService: ArtistService,
    private userService: AuthenticationService,
    private subscriptionService: SubscriptionService) {
    this.setData();
  }

  // connect(): Observable<PeriodicElement[]> {
  //   return this._dataStream;
  // }

  subscribe(artistId: string, artistStageName: string) {
    console.log(artistId);
    let userId = this.userService.getCurrentUserId();
    this.subscriptionService.subscribeArtist(userId, artistId, artistStageName).subscribe((data: any) => {
      // this.artistList = data.payload;
      console.log(data.payload);
    });
  }

  setData() {
    // this.dataSource.data = this.periodic;
    let userId = this.userService.getCurrentUserId();
    this.artistService.fetchAllArtists(userId).subscribe((data: any) => {
      // this.artistList = data.payload;
      console.log(data.payload);
      this.dataSource.data = data.payload;
    });
  }

}
