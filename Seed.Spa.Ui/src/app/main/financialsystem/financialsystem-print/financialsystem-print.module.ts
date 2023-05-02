import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FinancialSystemPrintComponent } from './financialsystem-print.component';
import { FinancialSystemPrintRoutingModule } from './financialsystem-print.routing.module';

import { FinancialSystemService } from '../financialsystem.service';
import { ApiService } from '../../../common/services/api.service';
import { FinancialSystemServiceFields } from '../financialsystem.service.fields';

import { FinancialSystemContainerDetailsComponent } from '../financialsystem-container-details/financialsystem-container-details.component';
import { FinancialSystemFieldDetailsComponent } from '../financialsystem-field-details/financialsystem-field-details.component';
import { CommonSharedModule } from '../../../common/common-shared.module';

@NgModule({
    imports: [
        CommonModule,
        CommonSharedModule,
        FinancialSystemPrintRoutingModule,
        FormsModule
    ],
    declarations: [
        FinancialSystemPrintComponent,
        FinancialSystemContainerDetailsComponent,
        FinancialSystemFieldDetailsComponent
    ],
    providers: [FinancialSystemService, ApiService, FinancialSystemServiceFields],
    exports: [FinancialSystemContainerDetailsComponent,FinancialSystemFieldDetailsComponent]
})
export class FinancialSystemPrintModule {

}
