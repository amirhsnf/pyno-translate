import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { PynoTranslatePipe } from './pyno-translate.pipe';

@NgModule({
  declarations: [PynoTranslatePipe],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [PynoTranslatePipe]
})
export class PynoTranslateModule {}
