import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import KontentSmartLink, {
  KontentSmartLinkEvent,
} from '@kentico/kontent-smart-link';
import { ActivatedRoute } from '@angular/router';
import { ElementModels } from '@kontent-ai/delivery-sdk';
import { map } from 'rxjs';
import { CoreComponent } from 'src/lib/core/core.component';
import { contentTypes, Hotel } from '../models';
import { KontentAiService } from '../services/kontent-ai.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
})
export class HotelComponent
  extends CoreComponent
  implements OnInit, AfterViewChecked, OnDestroy
{
  public hotel?: Hotel;

  public settings = {
    counter: false,
    plugins: [],
  };

  public googleMapUrl?: SafeUrl;
  public itemCodename?: string;

  public get itemId(): string | undefined {
    return this.hotel?.system.id;
  }

  public hotelElements = contentTypes.hotel.elements;
  public roomGroupElements = contentTypes.room_group.elements;
  public roomElements = contentTypes.room.elements;

  private initSmartlinkSdk: boolean = false;
  private smartLinkSdk?: KontentSmartLink;

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
          if (params['codename']) {
            const codename = params['codename'];
            this.itemCodename = codename;
            this.initHotel(codename);
          }
        })
      )
    );
  }

  ngAfterViewChecked(): void {
    if (this.initSmartlinkSdk) {
      this.initSmartlinkSdk = false;
      this.initSmartLinks();
    }
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    if (this.smartLinkSdk) {
      this.smartLinkSdk.destroy();
    }
  }

  initHotel(codename: string): void {
    super.subscribeToObservable(
      this.kontentAiService.getHotel(codename).pipe(
        map((hotel) => {
          this.hotel = hotel;
          this.googleMapUrl = this.getGoogleMapsUrl(hotel);
          this.initSmartlinkSdk = true;
          super.markForCheck();
        })
      )
    );
  }

  private initSmartLinks(): void {
    this.smartLinkSdk = KontentSmartLink.initialize({});
  }

  private getGoogleMapsUrl(hotel: Hotel): SafeUrl | undefined {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://maps.google.com/maps?q=${hotel.elements.lat.value},${hotel.elements.lng.value}&z=16&output=embed`
    );
  }
}
