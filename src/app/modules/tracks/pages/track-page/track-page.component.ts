import { TrackService } from '@modules/tracks/services/track.service';
import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-track-page',
  templateUrl: './track-page.component.html',
  styleUrls: ['./track-page.component.css'],
})
export class TrackPageComponent implements OnInit {
  tracksTrending: Array<TrackModel> = [];
  tracksRandom: Array<TrackModel> = [];
  listObservers$: Array<Subscription> = [];

  constructor(private trackService: TrackService) {}

  ngOnInit(): void {
    this.loadDataAll();
    this.loadDataRandom();
  }

  loadDataAll(): void {
    this.trackService.getAllTracks$().subscribe(
      (response: TrackModel[]) => {
        // console.log(response);
        this.tracksTrending = response;
      },
      (err) => {
        console.log('error de conexion');
      }
    );
  }

  async loadDataRandom(): Promise<void> {
    this.tracksRandom = await this.trackService.getAllRandom$().toPromise();
  }

  ngOnDestroy(): void {}
}
