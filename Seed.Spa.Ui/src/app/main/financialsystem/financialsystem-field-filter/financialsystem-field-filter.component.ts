import { Component, OnInit, Input } from '@angular/core';

import { ViewModel } from '../../../common/model/viewmodel';

@Component({
    selector: 'app-financialsystem-field-filter',
    templateUrl: './financialsystem-field-filter.component.html',
    styleUrls: ['./financialsystem-field-filter.component.css']
})
export class FinancialSystemFieldFilterComponent implements OnInit {

    @Input() vm: ViewModel<any>

    constructor() { }

    ngOnInit() {
    }

}
