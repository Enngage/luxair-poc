import { ChangeDetectorRef, Component } from '@angular/core';
import { CoreComponent } from 'src/lib/core/core.component';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
})
export class HotelComponent extends CoreComponent {
  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
  }
}
