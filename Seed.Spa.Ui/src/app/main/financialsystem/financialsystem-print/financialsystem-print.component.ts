import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { FinancialSystemService } from '../financialsystem.service';
import { ViewModel } from '../../../common/model/viewmodel';

@Component({
    selector: 'app-financialsystem-print',
    templateUrl: './financialsystem-print.component.html',
    styleUrls: ['./financialsystem-print.component.css'],
})
export class FinancialSystemPrintComponent implements OnInit {

    vm: ViewModel<any>;
    id: number;
    private sub: any;

    constructor(private financialSystemService: FinancialSystemService, private route: ActivatedRoute) {
        this.vm = this.financialSystemService.initVM();
    }

    ngOnInit() {

        this.sub = this.route.params.subscribe(params => {
            this.id = params['id']; 
        });

        if (this.id)
        {
            this.financialSystemService.get({ id: this.id }).subscribe((data) => {
                this.vm.details = data.data;
            });
        }
        
        this.updateCulture();

    }
    
	updateCulture(culture: string = null) {
        this.financialSystemService.updateCulture(culture).then((infos: any) => {
					this.vm.infos = infos;
					this.vm.grid = this.financialSystemService.getInfoGrid(infos);
        });
        this.financialSystemService.updateCultureMain(culture).then((infos: any) => {
					this.vm.generalInfo = infos;
        });
    }
    
    onPrint() {
        window.print();
    }
   


}
