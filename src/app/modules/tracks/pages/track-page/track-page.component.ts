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

  constructor(private TrackService: TrackService) {}

  ngOnInit(): void {
    const observer1$ = this.TrackService.dataTracksTrending$.subscribe(
      (response) => {
        this.tracksTrending = response;
        this.tracksRandom = response;
        //console.log('canciones trending---> ' + response);
      }
    );
    const observer2$ = this.TrackService.dataTracksRandom$.subscribe(
      (response) => {
        // concatenmos las canciones entrantes con las que ya existen
        this.tracksRandom = [...this.tracksRandom, ...response];
        //console.log('canciones random---> ' + response);
      }
    );

    this.listObservers$ = [observer1$, observer2$];
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach((u) => u.unsubscribe());
  }
}
