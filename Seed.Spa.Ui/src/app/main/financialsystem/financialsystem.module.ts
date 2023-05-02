import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap/modal';

import { FinancialSystemComponent } from './financialsystem.component';

import { FinancialSystemContainerFilterComponent } from './financialsystem-container-filter/financialsystem-container-filter.component';
import { FinancialSystemFieldFilterComponent } from './financialsystem-field-filter/financialsystem-field-filter.component';

import { FinancialSystemEditComponent } from './financialsystem-edit/financialsystem-edit.component';
import { FinancialSystemCreateComponent } from './financialsystem-create/financialsystem-create.component';
import { FinancialSystemDetailsComponent } from './financialsystem-details/financialsystem-details.component';

import { FinancialSystemFieldCreateComponent } from './financialsystem-field-create/financialsystem-field-create.component';
import { FinancialSystemFieldEditComponent } from './financialsystem-field-edit/financialsystem-field-edit.component';
import { FinancialSystemFieldGridComponent } from './financialsystem-field-grid/financialsystem-field-grid.component';

import { FinancialSystemContainerCreateComponent } from './financialsystem-container-create/financialsystem-container-create.component';
import { FinancialSystemContainerEditComponent } from './financialsystem-container-edit/financialsystem-container-edit.component';

import { FinancialSystemPrintModule } from './financialsystem-print/financialsystem-print.module';
import { FinancialSystemRoutingModule } from './financialsystem.routing.module';

import { FinancialSystemService } from './financialsystem.service';
import { FinancialSystemServiceFields } from './financialsystem.service.fields';

import { ApiService } from '../../common/services/api.service';
import { CommonSharedModule } from '../../common/common-shared.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ModalModule.forRoot(),
        CommonSharedModule,
        FinancialSystemRoutingModule,
        FinancialSystemPrintModule,

    ],
    declarations: [
        FinancialSystemComponent,
        FinancialSystemContainerFilterComponent,
        FinancialSystemFieldFilterComponent,
        FinancialSystemEditComponent,
        FinancialSystemCreateComponent,
        FinancialSystemDetailsComponent,
        FinancialSystemFieldCreateComponent,
        FinancialSystemFieldEditComponent,
        FinancialSystemContainerCreateComponent,
        FinancialSystemContainerEditComponent,
        FinancialSystemFieldGridComponent
    ],
    providers: [FinancialSystemService,FinancialSystemServiceFields, ApiService],
	exports: [FinancialSystemComponent, FinancialSystemEditComponent, FinancialSystemCreateComponent]
})
export class FinancialSystemModule {


}
