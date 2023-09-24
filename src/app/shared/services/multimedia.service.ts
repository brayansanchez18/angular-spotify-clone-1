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
  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00');
  public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject(
    '-00:00'
  );

  constructor() {
    this.audio = new Audio();
    this.trackInfo$.subscribe((responseOk) => {
      if (responseOk) {
        this.setAudio(responseOk);
      }
    });

    this.listenAllEvents();
  }

  private listenAllEvents(): void {
    this.audio.addEventListener('timeupdate', this.calculateTime, false);
  }

  private calculateTime = () => {
    console.log('dusparando evento');
    const { duration, currentTime } = this.audio;
    console.table([duration, currentTime]);
    this.setTimeElapsed(currentTime);
    this.setRemaining(currentTime, duration);
  };

  private setTimeElapsed(currentTime: number): void {
    let seconds = Math.floor(currentTime % 60); // obtenemos los segundos en numero enteros
    let minutes = Math.floor((currentTime / 60) % 60); // obtenemos los minutos en enteros

    // formato
    // 00:00 / 10:15
    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const displayFormat = `${displayMinutes}:${displaySeconds}`;
    this.timeElapsed$.next(displayFormat);
  }

  private setRemaining(currentTime: number, duration: number): void {
    let timeLeft = duration - currentTime;
    let seconds = Math.floor(timeLeft % 60);
    let minutes = Math.floor((timeLeft / 60) % 60);
    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const displayFormat = `-${displayMinutes}:${displaySeconds}`;
    this.timeRemaining$.next(displayFormat);
  }

  //TODO: funciones publicas
  public setAudio(track: TrackModel): void {
    console.log('ok', track);
    this.audio.src = track.url;
    console.log(this.audio.src);
    this.audio.play();
  }
}
