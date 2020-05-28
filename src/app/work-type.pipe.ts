import { Pipe, PipeTransform } from '@angular/core';
import { WorkType } from 'src/openapi';

@Pipe({
  name: 'workType'
})
export class WorkTypePipe implements PipeTransform {

  transform(value: WorkType, ...args: unknown[]): string {
    switch (value) {
      case 'Book':
        return "书籍";
      case 'Film':
        return "影视";
      default:
        throw 'Unknown WorkType: ' + value;
    }
  }

}
