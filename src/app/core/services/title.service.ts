import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable()
export class TitleService {

  constructor(private titleApi: Title) { }

  /**
   * Set the title in the browser.
   * @param title the title
   */
  setTitle(title: string) {
    this.titleApi.setTitle(title + ' | Lijstr.nl');
  }

}
