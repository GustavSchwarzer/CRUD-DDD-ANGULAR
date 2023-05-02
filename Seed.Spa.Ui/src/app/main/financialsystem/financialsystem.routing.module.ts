import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FinancialSystemComponent } from './financialsystem.component';
import { FinancialSystemEditComponent } from './financialsystem-edit/financialsystem-edit.component';
import { FinancialSystemDetailsComponent } from './financialsystem-details/financialsystem-details.component';
import { FinancialSystemCreateComponent } from './financialsystem-create/financialsystem-create.component';
import { GlobalService } from '../../global.service';


@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', data : { title : "FinancialSystem" }, component: FinancialSystemComponent },
            { path: 'edit/:id', data : { title : "FinancialSystem" } ,component: FinancialSystemEditComponent },
            { path: 'details/:id', data : { title : "FinancialSystem" }, component: FinancialSystemDetailsComponent },
            { path: 'create', data : { title : "FinancialSystem" }, component: FinancialSystemCreateComponent }
        ])
    ],
    exports: [
        RouterModule
    ]
})

export class FinancialSystemRoutingModule {
}