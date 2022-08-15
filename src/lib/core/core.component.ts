import {
  AfterViewChecked,
  ChangeDetectorRef,
  Directive,
  HostBinding,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import KontentSmartLink, {
  KontentSmartLinkEvent,
} from '@kentico/kontent-smart-link';
import { Observable, Subject, Subscription, throwError } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';
import { observableHelper } from '../helpers/observable-helper.class';

@Directive()
export abstract class CoreComponent implements OnDestroy, AfterViewChecked {
  @HostBinding('style') style = 'display: block';

  /*
   * See:
   * https://stackoverflow.com/questions/38008334/angular-rxjs-when-should-i-unsubscribe-from-subscription
   * https://medium.com/angular-in-depth/rxjs-avoiding-takeuntil-leaks-fb5182d047ef
   */
  protected readonly ngUnsubscribe_: Subject<void> = new Subject<void>();

  protected enableWebSpotlight: boolean = false;
  private initSmartlinkSdk: boolean = false;
  static smartLinkSdk?: KontentSmartLink;

  constructor(
    protected cdr: ChangeDetectorRef,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe_.next();
    this.ngUnsubscribe_.complete();

    if (CoreComponent.smartLinkSdk && this.enableWebSpotlight) {
      CoreComponent.smartLinkSdk.destroy();
    }
  }

  ngAfterViewChecked(): void {
    if (this.initSmartlinkSdk && this.enableWebSpotlight) {
      this.initSmartlinkSdk = false;
      this.initializeSmartLinks();
    }
  }

  detectChanges(): void {
    this.cdr.detectChanges();
  }

  markForCheck(): void {
    this.cdr.markForCheck();
  }

  toNumber(data: any): number {
    return +data;
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
  }

  protected isPreview(): boolean {
    const isPreview = this.activatedRoute.snapshot.queryParams['isPreview'];

    if (isPreview === 'true') {
      return true;
    }
    return false;
  }

  protected initSmartLinks(): void {
    if (this.enableWebSpotlight) {
      this.initSmartlinkSdk = true;
    }
  }

  protected zipObservables(observables: Observable<any>[]): Observable<void> {
    return observableHelper.zipObservables(observables);
  }

  protected subscribeToObservables(
    observables: Observable<any>[],
    onFinished?: () => void
  ): Subscription {
    return this.subscribeToObservable(
      observableHelper.zipObservables(observables).pipe(
        map(() => {
          if (onFinished) {
            onFinished();
          }
        })
      )
    );
  }

  protected subscribeToObservable(
    observable: Observable<any>,
    onFinished?: () => void
  ): Subscription {
    return observable
      .pipe(
        catchError((error) => {
          console.error(`Core component encountered an error: `, error);
          return throwError(() => error);
        }),
        // take until should be last operator in sequence
        // see https://medium.com/angular-in-depth/rxjs-avoiding-takeuntil-leaks-fb5182d047ef
        takeUntil(this.ngUnsubscribe_)
      )
      .subscribe(() => {
        if (onFinished) {
          onFinished();
        }
      });
  }

  private initializeSmartLinks(): void {
    this.initSmartlinkSdk = false;
    CoreComponent.smartLinkSdk = KontentSmartLink.initialize({
      debug: false,
    });
  }
}
