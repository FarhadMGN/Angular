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
  toolText: string;
  realCount: number;
  height: number;
  constructor(private renderer: Renderer2) {
    this.toolText = '';
  }
  @HostListener('window:resize') onResize(): void {
    setTimeout(() => {
      this.calcSize();
      this.makeToolText();
      this.cutText(this.txt.text);
    });
  }
  private calcSize() {
    const lineHeight = parseInt(window.getComputedStyle(this.areaRef.nativeElement, null).getPropertyValue('line-height'), 10);
    this.areaRef.nativeElement.children[1].innerHTML = this.txt.text;
    this.realCount = Math.ceil(this.areaRef.nativeElement.children[1].clientHeight / lineHeight);
    if (this.realCount > this.txt.countStr) {
        this.height = lineHeight * this.txt.countStr;
        this.renderer.setStyle(this.areaRef.nativeElement.children[0], 'height', this.height + 'px');
    } else {
        this.renderer.setStyle(this.areaRef.nativeElement.children[0], 'height', lineHeight * this.realCount + 'px');
    }
  }
  private makeToolText() {
    setTimeout(() => {
      if (this.realCount > this.txt.countStr) {
        this.toolText = this.txt.text;
      } else {
        this.toolText = '';
      }
    });
  }
  private cutText(content: string) {
    let end = content.length - 1;
    for (; end >= 0 && this.areaRef.nativeElement.children[1].clientHeight > this.height; --end) {
      this.areaRef.nativeElement.children[1].innerHTML = content.slice(0, end) + '...';
    }
    this.areaRef.nativeElement.children[0].innerHTML = this.areaRef.nativeElement.children[1].innerHTML;
    this.areaRef.nativeElement.children[1].innerHTML = '';
  }
  ngAfterViewInit() {
    this.calcSize();
    this.makeToolText();
    this.cutText(this.txt.text);
  }
}
