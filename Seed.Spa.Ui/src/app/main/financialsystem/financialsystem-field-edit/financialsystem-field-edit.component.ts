import { Component, OnInit, Input, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FinancialSystemService } from '../financialsystem.service';

import { ViewModel } from '../../../common/model/viewmodel';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-financialsystem-field-edit',
    templateUrl: './financialsystem-field-edit.component.html',
    styleUrls: ['./financialsystem-field-edit.component.css']
})
export class FinancialSystemFieldEditComponent implements OnInit {

    @Input() vm: ViewModel<any>


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
