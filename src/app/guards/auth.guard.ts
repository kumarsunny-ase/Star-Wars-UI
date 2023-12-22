import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../Service/api.service';
import { NgToastService } from 'ng-angular-popup';


@Injectable({
  providedIn: 'root'
})
// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

export class AuthGuard implements CanActivate {
  constructor(private api: ApiService, private route: Router, private toast: NgToastService){

  }


  canActivate(): boolean {
   if(this.api.isLoggedIn()){
    return true  
   }else{
    this.toast.error({detail: "ERROR", summary: "Please Login First!"});
    this.route.navigate(['login']);
    return false;
   }
  }

}