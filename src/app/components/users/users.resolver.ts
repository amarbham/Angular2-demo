import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class UsersResolver  {
  constructor() {}

  resolve(route: ActivatedRouteSnapshot) {
    return {
        foo: 'bar'
    };
  }
}