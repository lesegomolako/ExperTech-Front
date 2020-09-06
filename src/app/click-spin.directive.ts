import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[submit]'
})
export class ClickSpinDirective {

  @HostBinding('style.cursor') cursor: string = 'pointer';

}
