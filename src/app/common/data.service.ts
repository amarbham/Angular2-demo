import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

    constructor(private http: Http) { }

    get(url: string) {
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError)
    }

    private extractData(res: Response) {
        return res.json();
    }

    private handleError(error: any) {
        return Observable.throw(error.json().error || 'Server error');
    }
}