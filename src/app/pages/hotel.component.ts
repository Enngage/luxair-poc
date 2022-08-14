import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ElementModels } from '@kontent-ai/delivery-sdk';
import { map } from 'rxjs';
import { CoreComponent } from 'src/lib/core/core.component';
import { Hotel } from '../models';
import { KontentAiService } from '../services/kontent-ai.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
})
export class HotelComponent extends CoreComponent implements OnInit {
  public hotel?: Hotel;

  public settings = {
    counter: false,
    plugins: [],
  };

  public googleMapUrl?: SafeUrl;

  constructor(
    private kontentAiService: KontentAiService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    cdr: ChangeDetectorRef
  ) {
    super(cdr);
  }

  getGalleryThumbnailImageUrl(asset: ElementModels.AssetModel): string {
    return `${asset.url}?fit=scale&w=600&h=450`;
  }

  ngOnInit(): void {
    super.subscribeToObservable(
      this.activatedRoute.params.pipe(
        map((params) => {
          console.log(params);
          if (params['codename']) {
            this.initHotel(params['codename']);
          }
        })
      )
    );
  }

  initHotel(codename: string): void {
    super.subscribeToObservable(
      this.kontentAiService.getHotel(codename).pipe(
        map((hotel) => {
          this.hotel = hotel;
          this.googleMapUrl = this.getGoogleMapsUrl(hotel);
          super.markForCheck();
        })
      )
    );
  }

  private getGoogleMapsUrl(hotel: Hotel): SafeUrl | undefined {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://maps.google.com/maps?q=${hotel.elements.lat.value},${hotel.elements.lng.value}&z=16&output=embed`
    );
  }
}
