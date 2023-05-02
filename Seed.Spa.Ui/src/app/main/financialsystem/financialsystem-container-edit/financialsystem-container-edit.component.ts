//EXT
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { ViewModel } from '../../../common/model/viewmodel';
import { FinancialSystemService } from '../financialsystem.service';

@Component({
    selector: 'app-financialsystem-container-edit',
    templateUrl: './financialsystem-container-edit.component.html',
    styleUrls: ['./financialsystem-container-edit.component.css'],
})
export class FinancialSystemContainerEditComponent implements OnInit {

    @Input() vm: ViewModel<any>;
    id: number;
    private sub: any;

    constructor(private financialSystemService: FinancialSystemService, private route: ActivatedRoute, private router: Router) {

        this.vm = this.financialSystemService.initVM();
    }

    ngOnInit() {

       
    }

}
