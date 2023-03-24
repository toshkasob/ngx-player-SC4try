import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'videoTime',
})
export class VideoTimePipe implements PipeTransform {
  transform(timestamp: number): any {
    const hoursIntermediateValue = Math.floor(timestamp / 60 / 60);
    const minutesIntermediateValue = Math.floor(timestamp / 60) - hoursIntermediateValue * 60;
    const secondsIntermediateValue = Math.ceil(timestamp % 60);

    let hours: string =
      hoursIntermediateValue === 0
        ? ''
        : (hoursIntermediateValue < 10 ? '0' : '') + hoursIntermediateValue;
    let minutes: string = (minutesIntermediateValue < 10 ? '0' : '') + minutesIntermediateValue;
    let seconds: string = (secondsIntermediateValue < 10 ? '0' : '') + secondsIntermediateValue;

    return hours + (hours ? ':' : '') + minutes + ':' + seconds;
  }
}
