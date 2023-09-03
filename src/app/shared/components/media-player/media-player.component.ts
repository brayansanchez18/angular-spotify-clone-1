import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css'],
})
export class MediaPlayerComponent implements OnInit {
  mockCover: TrackModel = {
    _id: 7,
    name: 'Rayas de Patron',
    album: 'Soy la Bomba',
    cover:
      'https://source.boomplaymusic.com/group10/M00/03/21/59a2173be2ef42b28ae72a5bd1d47883_320_320.jpg',
    url: 'http://loclocalhost/track.mp3',
  };

  constructor() {}

  ngOnInit(): void {}
}
