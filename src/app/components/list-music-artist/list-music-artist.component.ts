import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MusicService } from 'src/app/shared/services/music.service';
import { AuthenticationService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-list-music-artist',
  templateUrl: './list-music-artist.component.html',
  styleUrls: ['./list-music-artist.component.css']
})
export class ListMusicArtistComponent implements OnInit {
  fileSource: string = '';

  musicList: any;
  email: string = '';
  delete: string;

  constructor(private musicService: MusicService, private userService: AuthenticationService) {
  }
  ngOnInit(): void {
    let userId = this.userService.getCurrentUserId();
    this.musicList = this.musicService.fetchAllMyMusics(userId).subscribe((data: any) => {
      console.log('on init artist music list. loading list')
      this.musicList = data.payload;
      this.dataSource.data = this.musicList;
      console.log(this.dataSource.data);
    })
  }
  public displayedColumns = ['title', 'stageName', 'description', 'genre'];
  public dataSource = new MatTableDataSource();

  // private _dataStream = new ReplaySubject<PeriodicElement[]>();



  removeData() {

  }

  addData() {

  }


  play(song: string) {
    this.fileSource = `http://localhost:3000/music/downnload/` + song + '?secret=';
  }
}
