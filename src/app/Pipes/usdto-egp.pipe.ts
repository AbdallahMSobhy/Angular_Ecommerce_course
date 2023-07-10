import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'USDtoEGP',
})
export class USDtoEGPPipe implements PipeTransform {
  transform(value: number): number {
    return value * 31;
  }
}
