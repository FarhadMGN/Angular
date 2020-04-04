import { Component } from '@angular/core';

export interface Text {
  text: string;
  countStr: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  text: Text = {
    text: 'My text here Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex, quasi!' +
      '  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur corporis cumque delectus distinctio obcaecati! ' +
      '  Consectetur consequuntur facere in magi maiores minima molestiae, quia veniam. Ducimus facere illo maiores saepe voluptas.' +
      '  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur corporis cumque delectus distinctio obcaecati! ' +
      '  gryaaaa Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cikue' +
      '  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur  cumque decision delectus distinctio obcaecati! ' +
      '  No more ip sum dolor sit amet, consectetur adipisicing elit. Ex, quasi! ',
    countStr: 2

  };
}
