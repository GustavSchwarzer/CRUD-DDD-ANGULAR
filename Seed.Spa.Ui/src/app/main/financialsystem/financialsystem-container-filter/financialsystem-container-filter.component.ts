//EXT
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { ViewModel } from '../../../common/model/viewmodel';
import { FinancialSystemService } from '../financialsystem.service';

@Component({
    selector: 'app-financialsystem-container-filter',
    templateUrl: './financialsystem-container-filter.component.html',
    styleUrls: ['./financialsystem-container-filter.component.css'],
})
export class FinancialSystemContainerFilterComponent implements OnInit {

    @Input() vm: ViewModel<any>;
  
    constructor(private financialSystemService: FinancialSystemService, private route: ActivatedRoute, private router: Router) {

        this.vm = this.financialSystemService.initVM();
    }

    ngOnInit() {

       
    }

}
