import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
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

    post(url: string, data: any) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(url, data, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        return res.json();
    }

    private handleError(error: any) {
        return Observable.throw(error.json().error || 'Server error');
    }
}