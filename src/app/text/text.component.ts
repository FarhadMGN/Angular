import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  QueryList,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  ViewChild, AfterViewChecked
} from '@angular/core';
import {Text} from '../app.component';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements AfterViewInit {

  @Input() txt: Text;
  @ViewChild('textArea', {static: false}) areaRef: ElementRef;
  text: string;
  realCount: number;
  constructor(private renderer: Renderer2) {}
  display() {
    const str = this.txt.countStr.toString();
    const lineHeight = window.getComputedStyle(this.areaRef.nativeElement, null).getPropertyValue('line-height');
    this.realCount = Math.ceil(this.areaRef.nativeElement.children[0].children[0].clientHeight / parseInt(lineHeight, 10));
    this.renderer.setStyle(this.areaRef.nativeElement, '-webkit-line-clamp', str);
    console.log('log', this.realCount);
    setTimeout(() => {
      if (this.realCount > this.txt.countStr) {
        this.text = this.txt.text;
      } else {
        this.text = '';
      }
    });
  }

  ngAfterViewInit() {
    this.display();
  }
}
