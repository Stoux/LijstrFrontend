import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from './loading/loading.component';
import { YoutubeViewerComponent } from './youtube-viewer/youtube-viewer.component';
import { ImdbService } from './services/imdb.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormatPermissionPipe } from './pipes/format-permission.pipe';
import { QuillModule } from 'ngx-quill';
import { EditorComponent } from './components/editor/editor.component';

@NgModule({
  imports: [
    CommonModule,
    QuillModule.forRoot({
      format: 'object',
      trackChanges: 'all',
    }),
    FormsModule,
  ],
  declarations: [
    LoadingComponent,
    YoutubeViewerComponent,
    FormatPermissionPipe,
    EditorComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    LoadingComponent,
    YoutubeViewerComponent,
    NgSelectModule,
    FormatPermissionPipe,
    EditorComponent,
  ],
  providers: [
    ImdbService
  ]
})
export class SharedModule { }
