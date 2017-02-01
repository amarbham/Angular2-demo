import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { User } from './users.interface';
import { Observable } from 'rxjs/Rx';
import { DataService } from '../../common/data.service';

@Injectable()
export class UsersResolver {

    constructor(
        private dataService: DataService
    ) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        return this.dataService.get('http://localhost:3000/users')
    }
}