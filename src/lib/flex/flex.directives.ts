import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FlexColumnAlign, FlexDirection, FlexRowAlign, FlexRowGap, FlexSize } from './flex.models';

function addClass(element: Element, className: string): void {
    if (element && element.classList) {
        element.classList.add(className);
    }
}

function removeClass(element: Element, className: string): void {
    if (element && element.classList) {
        element.classList.remove(className);
    }
}

@Directive({
    selector: '[libFlexRow]'
})
export class FlexRowDirective implements OnInit, OnChanges {
    @Input('libFlexRow') wrap?: boolean | string = false;

    private previousWrap?: boolean | string;

    constructor(private hostElement: ElementRef) {}

    ngOnInit(): void {
        if (this.hostElement.nativeElement) {
            addClass(this.hostElement.nativeElement, `w-flex-row`);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.hostElement.nativeElement) {
            if (this.previousWrap === true) {
                removeClass(this.hostElement.nativeElement, `w-flex-wrap`);
            }
        }

        if (this.wrap === true) {
            addClass(this.hostElement.nativeElement, `w-flex-wrap`);
        }
    }
}

@Directive({
    selector: '[libFlexColumn]'
})
export class FlexColumnDirective implements OnInit {
    constructor(private hostElement: ElementRef) {}

    ngOnInit(): void {
        if (this.hostElement.nativeElement) {
            addClass(this.hostElement.nativeElement, 'w-flex-column');
        }
    }
}

@Directive({
    selector: '[libFlexFill]'
})
export class FlexFillDirective implements OnInit {
    constructor(private hostElement: ElementRef) {}

    ngOnInit(): void {
        if (this.hostElement.nativeElement) {
            addClass(this.hostElement.nativeElement, 'w-flex-fill');
        }
    }
}

@Directive({
    selector: '[libFlexSize]'
})
export class FlexSizeDirective implements OnInit, OnChanges {
    @Input('libFlexSize') flexSize?: FlexSize;

    private previousFlexSize?: FlexSize;

    constructor(private hostElement: ElementRef) {}

    ngOnInit(): void {
        if (this.hostElement.nativeElement && this.flexSize) {
            addClass(this.hostElement.nativeElement, `w-flex-${this.flexSize}`);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.previousFlexSize && this.hostElement.nativeElement) {
            removeClass(this.hostElement.nativeElement, `w-flex-${this.previousFlexSize}`);
        }

        this.previousFlexSize = this.flexSize;

        if (this.hostElement.nativeElement && this.flexSize) {
            addClass(this.hostElement.nativeElement, `w-flex-${this.flexSize}`);
        }
    }
}

@Directive({
    selector: '[libFlexRowAlign]'
})
export class FlexRowAlignDirective implements OnInit, OnChanges {
    @Input('libFlexRowAlign') rowAlign?: FlexRowAlign;

    private previousAlign?: FlexRowAlign;

    constructor(private hostElement: ElementRef) {}

    ngOnInit(): void {
        if (this.hostElement.nativeElement && this.rowAlign) {
            addClass(this.hostElement.nativeElement, `w-flex-row-align-${this.rowAlign}`);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.previousAlign && this.hostElement.nativeElement) {
            removeClass(this.hostElement.nativeElement, `w-flex-row-align-${this.previousAlign}`);
        }

        this.previousAlign = this.rowAlign;

        if (this.hostElement.nativeElement && this.rowAlign) {
            addClass(this.hostElement.nativeElement, `w-flex-row-align-${this.rowAlign}`);
        }
    }
}

@Directive({
    selector: '[libFlexColumnAlign]'
})
export class FlexColumnAlignDirective implements OnInit, OnChanges {
    @Input('libFlexColumnAlign') columnAlign?: FlexColumnAlign;

    private previousAlign?: FlexColumnAlign;

    constructor(private hostElement: ElementRef) {}

    ngOnInit(): void {
        if (this.hostElement.nativeElement && this.columnAlign) {
            addClass(this.hostElement.nativeElement, `w-flex-align-${this.columnAlign}`);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.previousAlign && this.hostElement.nativeElement) {
            removeClass(this.hostElement.nativeElement, `w-flex-align-${this.previousAlign}`);
        }

        this.previousAlign = this.columnAlign;

        if (this.hostElement.nativeElement && this.columnAlign) {
            addClass(this.hostElement.nativeElement, `w-flex-align-${this.columnAlign}`);
        }
    }
}

@Directive({
    selector: '[libFlexRowGap]'
})
export class FlexRowGapDirective implements OnInit, OnChanges {
    @Input('libFlexRowGap') rowGap?: FlexRowGap;

    private previousGap?: FlexRowGap;

    constructor(private hostElement: ElementRef) {}

    ngOnInit(): void {
        if (this.hostElement.nativeElement && this.rowGap) {
            addClass(this.hostElement.nativeElement, `w-flex-row-gap-${this.rowGap}`);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.previousGap && this.hostElement.nativeElement) {
            removeClass(this.hostElement.nativeElement, `w-flex-row-gap-${this.previousGap}`);
        }

        this.previousGap = this.rowGap;

        if (this.hostElement.nativeElement && this.rowGap) {
            addClass(this.hostElement.nativeElement, `w-flex-row-gap-${this.rowGap}`);
        }
    }
}

@Directive({
    selector: '[libFlexDirection]'
})
export class FlexDirectionDirective implements OnInit, OnChanges {
    @Input('libFlexDirection') direction?: FlexDirection;

    private previousDirection?: FlexDirection;

    constructor(private hostElement: ElementRef) {}

    ngOnInit(): void {
        if (this.hostElement.nativeElement && this.direction) {
            addClass(this.hostElement.nativeElement, `w-flex-row-direction-${this.direction}`);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.previousDirection && this.hostElement.nativeElement) {
            removeClass(this.hostElement.nativeElement, `w-flex-row-direction-${this.previousDirection}`);
        }

        this.previousDirection = this.direction;

        if (this.hostElement.nativeElement && this.direction) {
            addClass(this.hostElement.nativeElement, `w-flex-row-direction-${this.direction}`);
        }
    }
}
