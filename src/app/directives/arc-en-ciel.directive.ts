
import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: 'input[appArcEnCiel]',  
  standalone: true,
})
export class ArcEnCielDirective {
  private colors: string[] = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
  @HostBinding('style.color') textColor!: string;
  @HostBinding('style.borderColor') borderColor!: string;
  @HostListener('keyup') onKeyUp() {
    const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
    this.textColor = randomColor;
    this.borderColor = randomColor;
  }
}
