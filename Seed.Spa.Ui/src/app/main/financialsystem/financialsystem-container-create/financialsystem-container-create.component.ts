//EXT
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { ViewModel } from '../../../common/model/viewmodel';
import { FinancialSystemService } from '../financialsystem.service';

@Component({
    selector: 'app-financialsystem-container-create',
    templateUrl: './financialsystem-container-create.component.html',
    styleUrls: ['./financialsystem-container-create.component.css'],
})
export class FinancialSystemContainerCreateComponent implements OnInit {

    @Input() vm: ViewModel<any>;
  
    constructor(private financialSystemService: FinancialSystemService, private route: ActivatedRoute, private router: Router) {

        this.vm = this.financialSystemService.initVM();
    }

    ngOnInit() {

       
    }

}
