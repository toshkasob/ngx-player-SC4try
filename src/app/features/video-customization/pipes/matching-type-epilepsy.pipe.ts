import { Pipe, PipeTransform } from '@angular/core';
import { EpilepsyProtectionEnum, EpilepsyProtectionRUEnum } from '../models/epilepsy-protection.enum';

@Pipe({
  name: 'matchingTypeEpilepsy',
})
export class MatchingTypeEpilepsyPipe implements PipeTransform {
  transform(value: EpilepsyProtectionEnum): EpilepsyProtectionRUEnum {
    switch (value) {
      case EpilepsyProtectionEnum.CUT:
        return EpilepsyProtectionRUEnum.CUT;
      case EpilepsyProtectionEnum.SLOWDOWN:
        return EpilepsyProtectionRUEnum.SLOWDOWN;
    }
  }
}
