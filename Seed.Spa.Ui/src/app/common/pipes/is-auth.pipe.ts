import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Pipe({
  name: 'isAuth',
})
export class isAuthPipe implements PipeTransform {

  constructor(private auth: AuthService) {

  }

  transform(vm: any, operation: string): boolean {
    var currentUser = this.auth.currentUser();
    if (currentUser) {
      var tools = JSON.parse(currentUser.claims.tools);
      return tools.filter((item) => {

        if (operation && item.Key && vm.key)
          return item.Key.toString().toLowerCase() == vm.key.toString().toLowerCase() && item[operation] == true;

        if (item.Key && vm.key)
          return item.Key.toString().toLowerCase() == vm.key.toString().toLowerCase();

      }).length > 0 
    }
    return true;
  }
}
