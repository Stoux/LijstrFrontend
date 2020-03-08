import { Pipe, PipeTransform } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

@Pipe({
  name: 'formatPermission'
})
export class FormatPermissionPipe implements PipeTransform {

  private titleCasePipe: TitleCasePipe;

  constructor() {
    this.titleCasePipe = new TitleCasePipe();
  }

  transform(value: string, ...args: unknown[]): string {
    return value
      .substr(5) // Each permission is prefixed with ROLE_
      // .toLowerCase()
      .split('_')
      .map(this.titleCasePipe.transform)
      .join(' ');
  }

}
