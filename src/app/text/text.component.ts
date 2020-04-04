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
  ViewChild
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
  isShow: boolean = false;
  isFit:  boolean = false;

  @HostListener('mouseenter') onEnter() {
    if (!this.isFit) {
      setTimeout(() => {
        this.isShow = true;
      }, 300);
    }
  };
  @HostListener('mouseleave') onleave() {
    setTimeout(() => {
      this.isShow = false;
    }, 400);
  };

  ngAfterViewInit() {
    this.display();
  }

  display() {
    const box = document.querySelector('.box');
    const text = box.innerHTML;
    const line_h = window.getComputedStyle(this.areaRef.nativeElement, null).getPropertyValue('line-height');
    const realCount = Math.ceil(box.clientHeight / parseInt(line_h, 10));
    if (realCount > this.txt.countStr) {
      this.isFit = false;
      const divTmp = document.createElement('div');
      divTmp.style.position = 'absolute';
      divTmp.style.visibility = 'hidden';
      divTmp.style.width = box.clientWidth + 'px';
      divTmp.innerHTML = text;
      divTmp.style.fontSize = line_h;
      divTmp.style.lineHeight = line_h;
      document.body.appendChild(divTmp);
      const new_h = parseInt(line_h, 10) * this.txt.countStr;
      let i = text.length - 1;
      for (; i >= 0 && divTmp.clientHeight > new_h; --i) {
        divTmp.innerHTML = text.substring(0, i) + '...';
      }
      box.innerHTML = divTmp.innerHTML;
    } else {
      this.isFit = true;
    }
  }

}
