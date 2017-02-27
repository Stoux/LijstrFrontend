import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { LoadingComponent } from "./loading/loading.component";
import { MarkdownModule } from "angular2-markdown";

@NgModule({
  imports: [
    CommonModule,
    MarkdownModule.forRoot()
  ],
  declarations: [
    LoadingComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    MarkdownModule,
    LoadingComponent
  ]
})
export class SharedModule { }
