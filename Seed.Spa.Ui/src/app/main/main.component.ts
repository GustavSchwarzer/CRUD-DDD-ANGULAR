import { Component, OnInit, SecurityContext } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { AuthService } from '../common/services/auth.service'
import { GlobalServiceCulture } from '../global.service.culture'
import { GlobalService, NotificationParameters } from '../global.service'
import { MainService } from './main.service';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from '../icons/icon-subset';

@Component({
  selector: 'app-dashboard',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [GlobalServiceCulture, MainService]
})
export class MainComponent implements OnInit {

  vm: any;
  menuIsOpen: boolean;
  filter: string;
  avatarJson: any;
  logoJson: any;
  logoJsonLittle: any;
  navItems: Array<any> = [
    {
      name: 'Financial System',
      key: 'Financial',
      url: '/financialsystem',
      icon: 'icon-speedometer'
    }
  ];
  constructor(private authService: AuthService, private globalServiceCulture: GlobalServiceCulture, private mainService: MainService, private sanitizer: DomSanitizer, private router: Router, private iconSetService: IconSetService) {

    this.vm = {};
    this.menuIsOpen = true;
    this.vm.generalInfo = this.mainService.getInfosFields();
    this.vm.downloadUri = GlobalService.getEndPoints().DOWNLOAD;
    this.vm.avatar = null;

    this.mainService.updateCulture(this.vm);
    GlobalService.getChangeCultureEmitter().subscribe((culture: any) => {
      this.mainService.updateCulture(this.vm, culture);
    });
    // iconSet singleton
    iconSetService.icons = { ...iconSubset };
  }

  

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };


  onUpdateCulture(event: any, culture: string) {

    event.preventDefault();
    this.mainService.updateCulture(this.vm, culture);
    GlobalService.getChangeCultureEmitter().emit(culture);

  }

  ngOnInit() {

    

    this.logoJson = {
      src: "../../assets/img/logo.png",
      width: 154,
      height: 46,
      alt: this.vm.userName
    };

    this.logoJsonLittle = {
      src: "../../assets/img/logo_sm.png",
      width: 35,
      height: 35,
      alt: this.vm.userName
    };
      

    this.authService.getCurrentUser((result: any, firstTime: any) => {

      if (result.isAuth) {
        
        if (firstTime)
          this.router.navigate(["/home"]);
      }
    });
  }

  onToggleMenu(e: any) {

    this.menuIsOpen = !this.menuIsOpen
  }

  onLogout(e: any) {
    e.preventDefault();
    var conf = GlobalService.operationExecutedParameters("confirm-modal", () => {
      this.mainService.resetCulture();
    }, "Deseja Realmente Sair do Sistema");
    GlobalService.getOperationExecutedEmitter().emit(conf);
  }

  onFilter(filter: any) {

  }

}
