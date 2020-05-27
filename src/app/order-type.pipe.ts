import { Pipe, PipeTransform } from '@angular/core';
import { OrderByType } from 'src/openapi';

@Pipe({
  name: 'orderType'
})
export class OrderTypePipe implements PipeTransform {

  transform(value: OrderByType, ...args: unknown[]): string {
    switch (value) {
      case OrderByType.Hottest:
        return '按热度';
      case OrderByType.Newest:
        return '按时间';
      default:
        throw 'Unknown enum value:' + value;
    }
  }

}
