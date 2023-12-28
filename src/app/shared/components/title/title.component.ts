import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shared-title',
  templateUrl: './title.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class TitleComponent {

  @Input() title = '';

}
