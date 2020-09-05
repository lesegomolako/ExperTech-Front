import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[click]'
})
export class ClickSpinDirective {

  @HostBinding('style.cursor') cursor: string = 'pointer';

}
