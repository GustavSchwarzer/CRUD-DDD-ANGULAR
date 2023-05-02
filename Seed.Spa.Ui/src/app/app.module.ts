import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import ptBr from '@angular/common/locales/pt';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {
    AvatarModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    FooterModule,
    FormModule,
    GridModule,
    HeaderModule,
    ListGroupModule,
    NavModule,
    ProgressModule,
    SharedModule,
    SidebarModule,
    TabsModule,
    UtilitiesModule
} from '@coreui/angular';
import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AppComponent } from './app.component';
import { RoutingCustom } from './app.custom.routing';
import { RoutingDefault } from './app.routing';
import { AvatarComponent } from './common/components/avatar.component';
import { ConfirmModalComponent } from './common/components/confirm-modal.component';
import { LoadingTopComponent } from './common/components/loading-top.component';
import { LoadingComponent } from './common/components/loading.component';
import { MenuComponent } from './common/components/menu.component';
import { MessageModalComponent } from './common/components/message-modal.component';
import { AsidebarToggleDirective } from './common/directives/asidebar.directive';
import { SidebarToggleDirective } from './common/directives/sidebar.directive';
import { ApiService } from './common/services/api.service';
import { AuthGuard } from './common/services/auth.guard';
import { AuthService } from './common/services/auth.service';
import { ServiceBase } from './common/services/service.base';
import { GlobalServiceCulture } from './global.service.culture';
import { LoginComponent } from './login/login.component';
// Import containers
import {
    DefaultFooterComponent,
    DefaultHeaderComponent,
    DefaultLayoutComponent
} from './main/default-layout';
import { MainComponent } from './main/main.component';
import { MainService } from './main/main.service';
import { StartupService } from './startup.service';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { EEnumService } from './util/enum/enum.service';

registerLocaleData(ptBr)


export function startupServiceFactory(startupService: StartupService): Function {
  return () => startupService.load();
}

@NgModule({
  declarations: [
    AppComponent,
    AvatarComponent,
    MainComponent,
    LoginComponent,
    UnauthorizedComponent,
    LoadingComponent,
    ConfirmModalComponent,
    MessageModalComponent,
    MenuComponent,
    LoadingTopComponent,
    SidebarToggleDirective,
    AsidebarToggleDirective,
    DefaultFooterComponent,
    DefaultHeaderComponent,
    DefaultLayoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    PerfectScrollbarModule,
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,

    RoutingDefault,
    RoutingCustom,
    PerfectScrollbarModule,
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    SimpleNotificationsModule.forRoot(),
    IconSetModule.forRoot(),
    RouterModule
  ],
  providers: [
    //HttpModule,
    StartupService,
    {
      provide : LOCALE_ID,
      useValue: 'pt-PT'
    },
    {
      provide: APP_INITIALIZER,
      useFactory: startupServiceFactory,
      deps: [StartupService],
      multi: true
    },
    AuthService,
    ApiService,
    AuthGuard,
    MainService,
    ServiceBase,
    GlobalServiceCulture,
    EEnumService,
    IconSetService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
