import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    FlexColumnAlignDirective,
    FlexColumnDirective,
    FlexDirectionDirective,
    FlexFillDirective,
    FlexRowAlignDirective,
    FlexRowDirective,
    FlexRowGapDirective,
    FlexSizeDirective
} from './flex.directives';

@NgModule({
    imports: [CommonModule],
    declarations: [
        FlexRowDirective,
        FlexColumnDirective,
        FlexFillDirective,
        FlexSizeDirective,
        FlexRowAlignDirective,
        FlexRowGapDirective,
        FlexColumnAlignDirective,
        FlexDirectionDirective
    ],
    exports: [
        FlexRowDirective,
        FlexColumnDirective,
        FlexFillDirective,
        FlexSizeDirective,
        FlexRowAlignDirective,
        FlexRowGapDirective,
        FlexColumnAlignDirective,
        FlexDirectionDirective
    ]
})
export class AppFlexModule {}
