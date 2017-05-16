import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { LoadingComponent } from "./loading/loading.component";
import { YoutubeViewerComponent } from './youtube-viewer/youtube-viewer.component';
import { TargetDetailSummaryComponent } from "./target/detail-summary/target-detail-summary.component";
import { TargetDetailPosterComponent } from "./target/detail-poster/target-detail-poster.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoadingComponent,
    YoutubeViewerComponent,
    TargetDetailSummaryComponent,
    TargetDetailPosterComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    LoadingComponent,
    YoutubeViewerComponent,
    TargetDetailSummaryComponent,
    TargetDetailPosterComponent
  ]
})
export class SharedModule { }
