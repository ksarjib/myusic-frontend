import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MusicService } from '../../shared/services/music.service';
import { AuthenticationService } from '../../shared/services/user.service';

/**
 * @title displaying list of musics and artists here
 */
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  musicList: any;
  email: string = '';
  currentRoute: string = '';

  periodic = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  ];

  // columns we will show on the table
  public displayedColumns = ['position', 'name', 'weight', 'symbol'];
  //the source where we will get the data
  public dataSource = new MatTableDataSource();

  // private _dataStream = new ReplaySubject<PeriodicElement[]>();

  constructor(private musicService: MusicService,
    private userService: AuthenticationService,
    private router: Router) {
    this.setData();
  }

  // connect(): Observable<PeriodicElement[]> {
  //   return this._dataStream;
  // }

  loadMusics() {
    console.log('Loading musics');
    this.router.navigate(['user/dashboard/musics']);
  }

  loadArtists() {
    console.log('Loading artist');
    this.router.navigate(['user/dashboard/artists']);
  }

  ngOnInit() {
    this.currentRoute = this.router.url;
  }

  setData() {
    this.dataSource.data = this.periodic;
    let userId = this.userService.getCurrentUserId();
    this.musicService.fetchAllSubscribedMusics(userId).subscribe((data) => {
      this.musicList = data;
    });
  }
}
