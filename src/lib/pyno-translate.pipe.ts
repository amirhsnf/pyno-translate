import { Pipe, PipeTransform } from '@angular/core';
import { PynoTranslateService } from './pyno-translate.service';

@Pipe({
  name: 'translate',
  standalone: false,
  pure: false
})
export class PynoTranslatePipe implements PipeTransform {
  constructor(private translateService: PynoTranslateService) {}
  transform(key: string, params?: Record<string, string | number>): string {
    return this.translateService.translate(key, params);
  }
}
