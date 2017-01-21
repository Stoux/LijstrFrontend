import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'lijstr-error-page',
  templateUrl: 'error-page.component.html',
  styleUrls: ['error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  private static readonly digitsOnly = new RegExp('^\\d+$');

  errorCode : number;
  message : string;

  constructor(private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.url.subscribe(segments => {
      if (segments.length == 1) {
        let path = segments[0].path;
        if (ErrorPageComponent.digitsOnly.test(path)) {
          let errorCode = parseInt(path);
          this.handleErrorCode(errorCode);
          return;
        }
      }

      this.handleErrorCode(404);
    });
  }

  private handleErrorCode(code : number) {
    this.errorCode = code;
    switch(code) {
      case 404:
        this.message = "Ja deze pagina is er dus niet";
        break;

      case 403:
        this.message = "Ja das dus alleen voor grote jongentjes";
        break;

      default:
        this.message = "RIP";
    }
  }


}
