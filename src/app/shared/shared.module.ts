import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { LoadingComponent } from "./loading/loading.component";
import { YoutubeViewerComponent } from './youtube-viewer/youtube-viewer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoadingComponent,
    YoutubeViewerComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    LoadingComponent,
    YoutubeViewerComponent
  ]
})
export class SharedModule { }
