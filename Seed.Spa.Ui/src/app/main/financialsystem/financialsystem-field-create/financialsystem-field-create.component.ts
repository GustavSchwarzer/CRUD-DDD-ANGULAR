import { Component, OnInit, Input, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FinancialSystemService } from '../financialsystem.service';

import { ViewModel } from '../../../common/model/viewmodel';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GlobalService, NotificationParameters } from '../../../global.service';

@Component({
    selector: 'app-financialsystem-field-create',
    templateUrl: './financialsystem-field-create.component.html',
    styleUrls: ['./financialsystem-field-create.component.css']
})
export class FinancialSystemFieldCreateComponent implements OnInit {

   @Input() vm: ViewModel<any>;

   constructor(private financialSystemService: FinancialSystemService, private ref: ChangeDetectorRef) { }

   ngOnInit() {}


    ngOnChanges() {
       this.ref.detectChanges()
    }

    onSaveEnd(model: any) {
       
    }

    onBackEnd(model: any) {
       
    }

   


}
