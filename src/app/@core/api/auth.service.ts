import { Injectable } from '@angular/core';
import {SsoService} from "../../../../sso-implementation/helpers/sso.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private sso: SsoService) {
  }

  logout() {
      return this.sso.logout();
  }
}
