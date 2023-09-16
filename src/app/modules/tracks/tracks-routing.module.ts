import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrackPageComponent } from './pages/track-page/track-page.component';
import { TracksModule } from './tracks.module';
import { TrackService } from './services/track.service';

const routes: Routes = [
  {
    path: '',
    component: TrackPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TracksRoutingModule {}
