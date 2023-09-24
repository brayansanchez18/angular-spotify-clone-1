import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css'],
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('');
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

  handlePosition(event: MouseEvent): void {
    const elNative: HTMLElement = this.progressBar.nativeElement;
    const { clientX } = event;
    const { x, width } = elNative.getBoundingClientRect();
    const clickX = clientX - x;
    const percentageFromX = (clickX * 100) / width;
    // console.log(`click x: ${percentageFromX}`);
    //console.log('evento de mouse', event);
    this.multimediaservice.seekAudio(percentageFromX);
  }
}
