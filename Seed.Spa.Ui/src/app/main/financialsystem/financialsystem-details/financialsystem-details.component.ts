import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { ViewModel } from '../../../common/model/viewmodel';
import { FinancialSystemService } from '../financialsystem.service';

@Component({
    selector: 'app-financialsystem-details',
    templateUrl: './financialsystem-details.component.html',
    styleUrls: ['./financialsystem-details.component.css'],
})
export class FinancialSystemDetailsComponent implements OnInit {

    @Input() vm: ViewModel<any>;
    id: number;
    private sub: any;

    constructor(private financialSystemService: FinancialSystemService, private route: ActivatedRoute, private router: Router) {

        this.vm = this.financialSystemService.initVM();

    }

    ngOnInit() {

        this.sub = this.route.params.subscribe(params => {
            this.id = params['id']; 
        });

        if (this.id) {
            this.financialSystemService.get({ id: this.id }).subscribe((data) => {
                this.vm.details = data.data;
            })
        };
        this.updateCulture();
    }
    
    updateCulture(culture: string = null) {
        this.financialSystemService.updateCulture(culture).then((infos: any) => {
            this.vm.infos = infos;
            this.vm.grid = this.financialSystemService.getInfoGrid(infos);
        });
    }

    
}
