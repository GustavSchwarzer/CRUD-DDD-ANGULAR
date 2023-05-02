
import { Component, OnInit, Input } from '@angular/core';

import { ViewModel } from '../../../common/model/viewmodel';

@Component({
    selector: 'app-financialsystem-field-details',
    templateUrl: './financialsystem-field-details.component.html',
    styleUrls: ['./financialsystem-field-details.component.css']
})
export class FinancialSystemFieldDetailsComponent implements OnInit {


    @Input() vm: ViewModel<any>;

    constructor() { }

    ngOnInit() {

    }

}
