import {
  AfterViewChecked,
  ChangeDetectorRef,
  Directive,
  HostBinding,
  OnDestroy,
} from '@angular/core';
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

  private initSmartlinkSdk: boolean = false;
  private smartLinkSdk?: KontentSmartLink;

  constructor(protected cdr: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe_.next();
    this.ngUnsubscribe_.complete();

    if (this.smartLinkSdk) {
      this.smartLinkSdk.destroy();
    }
  }

  ngAfterViewChecked(): void {
    if (this.initSmartlinkSdk) {
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

  protected initSmartLinks(): void {
    this.initSmartlinkSdk = true;
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
    this.smartLinkSdk = KontentSmartLink.initialize({});
  }
}
