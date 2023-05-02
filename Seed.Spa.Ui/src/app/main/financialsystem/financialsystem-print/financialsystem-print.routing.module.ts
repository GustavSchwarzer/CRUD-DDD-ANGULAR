import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FinancialSystemPrintComponent } from './financialsystem-print.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: FinancialSystemPrintComponent }
        ])
    ],
    exports: [
        RouterModule
    ]
})

export class  FinancialSystemPrintRoutingModule {

}