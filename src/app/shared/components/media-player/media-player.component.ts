import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css'],
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  listObservers$: Array<any> = [];
  state: string = 'paused';
  constructor(public multimediaservice: MultimediaService) {}

  ngOnInit(): void {
    const observer1$ = this.multimediaservice.playerStatus$.subscribe(
      (status) => (this.state = status)
    );
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach((u) => u.unsubscribe());
    console.log('se destruye el componente');
  }
}
