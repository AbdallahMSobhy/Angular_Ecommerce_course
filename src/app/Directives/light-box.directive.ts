import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[LightBox]',
})
export class LightBoxDirective implements OnChanges {
  @Input('LightBox') highLightColor: string = 'green';
  @Input() defualtcolor: string = 'Red';
  constructor(private elementref: ElementRef) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.elementref.nativeElement.style.border = `3px solid ${this.defualtcolor}`;
  }
  @HostListener('mouseover') onMouseOver() {
    this.elementref.nativeElement.style.border = `3px solid ${this.highLightColor}`;
  }
  @HostListener('mouseout') onMouseOut() {
    this.elementref.nativeElement.style.border = `3px solid ${this.defualtcolor}`;
  }
}
