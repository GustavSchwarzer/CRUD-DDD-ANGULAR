import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './common/services/auth.guard';

const APP_ROUTES_DEFAULT: Routes = [

    {
        path: '', component: MainComponent, data : { title : "Main" }, children: [

			{ path: 'financialsystem',  loadChildren: () => import('./main/financialsystem/financialsystem.module').then(m => m.FinancialSystemModule) },



            ]
    },

      { path: 'financialsystem/print/:id', loadChildren: () => import('./main/financialsystem/financialsystem-print/financialsystem-print.module').then(m => m.FinancialSystemPrintModule) },

]


export const RoutingDefault: ModuleWithProviders<any> = RouterModule.forRoot(APP_ROUTES_DEFAULT);


