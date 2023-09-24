import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { BehaviorSubject, Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MultimediaService {
  callback: EventEmitter<any> = new EventEmitter<any>();
  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  public audio!: HTMLAudioElement;

  constructor() {
    this.audio = new Audio();
    this.trackInfo$.subscribe((responseOk) => {
      if (responseOk) {
        this.setAudio(responseOk);
      }
    });
  }

  private listenAllEvents(): void {}

  //TODO: funciones publicas
  public setAudio(track: TrackModel): void {
    console.log('ok', track);
    this.audio.src = track.url;
    console.log(this.audio.src);
    this.audio.play();
  }
}
