import { Component, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'lijstr-youtube-viewer',
  templateUrl: './youtube-viewer.component.html',
  styleUrls: ['./youtube-viewer.component.css']
})
export class YoutubeViewerComponent implements OnChanges {

  @Input() youtubeId: string;
  youtubeUrl: SafeResourceUrl;

  showButton: boolean;
  showVideo: boolean;

  constructor(private sanitizer: DomSanitizer) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.showButton = this.youtubeId != null;
    this.showVideo = false;

    if (this.youtubeId != null) {
      this.youtubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        'https://www.youtube.com/embed/' + this.youtubeId + '?autoplay=1'
      );
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.showVideo && event.keyCode == 27) {
      this.hide();
    }
  }



  show(event: Event) {
    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (!mobile) {
      event.preventDefault();
      this.showVideo = true;
    }
  }

  hide() {
    this.showVideo = false;
  }

}
