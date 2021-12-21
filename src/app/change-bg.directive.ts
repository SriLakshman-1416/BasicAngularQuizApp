import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appChangeBg]'
})
export class ChangeBgDirective {

  @Input() isCorrect : Boolean = false;
  constructor(private elemRf : ElementRef,private render : Renderer2) { }
  @HostListener('click') answer(){
    if(this.isCorrect)
    {
       this.render.setStyle(this.elemRf.nativeElement,'background','green');
       this.render.setStyle(this.elemRf.nativeElement,'color','#fff');
       this.render.setStyle(this.elemRf.nativeElement,'border','2px solid grey');
    }else{
      this.render.setStyle(this.elemRf.nativeElement,'background','red');
      this.render.setStyle(this.elemRf.nativeElement,'color','#fff');
      this.render.setStyle(this.elemRf.nativeElement,'border','2px solid grey');
    }
  }

}
