import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {

  @Input() sidebarId: string = "sidebar";
  @Input() vm: any;
  @Output() logout = new EventEmitter<any>();

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  public avatarSrc = null;
  constructor(private classToggler: ClassToggleService) {
    super();
    
  }
  ngOnInit() {
    this.avatarSrc = this.vm.downloadUri + "/usuario/" + (this.vm.avatar || 'vazio.png')
  }
  onLogout(e: any) {
    this.logout.emit(e);
  }
}
