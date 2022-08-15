import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Elements } from '@kontent-ai/delivery-sdk';
import { CoreComponent } from 'src/lib/core/core.component';

@Component({
  selector: 'app-description-section',
  templateUrl: './description-section.component.html',
})
export class DescriptionSectionComponent extends CoreComponent {
  @Input() element?: Elements.RichTextElement;
  @Input() title?: string;
  @Input() elementCodename?: string;

  constructor(activatedRoute: ActivatedRoute, cdr: ChangeDetectorRef) {
    super(cdr, activatedRoute);
  }
}
