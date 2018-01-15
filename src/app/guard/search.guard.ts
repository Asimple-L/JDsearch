/**
 * Created by Asimple on 2018/1/1.
 */
import {ActivatedRouteSnapshot, CanActivate} from '@angular/router';

export class SearchGuard implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot) {
    const str = route.params['Info'];
    if ( str == 'undefined') {
      return false;
    } else {
      return true;
    }
  }
}
