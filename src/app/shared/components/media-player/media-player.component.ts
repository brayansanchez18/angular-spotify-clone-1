import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css'],
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  mockCover: TrackModel = {
    _id: 7,
    name: 'Rayas de Patron',
    album: 'Soy la Bomba',
    cover:
      'https://source.boomplaymusic.com/group10/M00/03/21/59a2173be2ef42b28ae72a5bd1d47883_320_320.jpg',
    url: 'http://loclocalhost/track.mp3',
  };

  listObservers$: Array<any> = [];

  constructor(private multimediaservice: MultimediaService) {}

  ngOnInit(): void {
    const observer1$ = this.multimediaservice.callback.subscribe(
      (response: TrackModel) => {
        // console.log('resibiendo cancion: ' + response);
      }
    );
    this.listObservers$ = [observer1$];
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach((u) => u.unsubscribe());
    console.log('se destruye el componente');
  }
}
