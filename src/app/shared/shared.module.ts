import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from './loading/loading.component';
import { YoutubeViewerComponent } from './youtube-viewer/youtube-viewer.component';
import { ImdbService } from './services/imdb.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormatPermissionPipe } from './pipes/format-permission.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoadingComponent,
    YoutubeViewerComponent,
    FormatPermissionPipe,
  ],
  exports: [
    CommonModule,
    FormsModule,
    LoadingComponent,
    YoutubeViewerComponent,
    NgSelectModule,
    FormatPermissionPipe,
  ],
  providers: [
    ImdbService
  ]
})
export class SharedModule { }
