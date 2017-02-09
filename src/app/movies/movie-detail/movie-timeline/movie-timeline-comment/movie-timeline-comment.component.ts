import { Component, Input } from "@angular/core";
import { MovieComment } from "../../../models/timeline";

@Component({
  selector: 'lijstr-movie-timeline-comment',
  templateUrl: './movie-timeline-comment.component.html'
})
export class MovieTimelineCommentComponent {

  @Input() comment : MovieComment;
  @Input() displayName : string;

  constructor() {
  }

}
