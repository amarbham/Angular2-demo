import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    get(url: string) {
        return this.http.get(url)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError)
    }

    post(url: string, data: any) {
        let options = new RequestOptions({ headers: this.headers });

        return this.http.post(url, data, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    delete(url: string) {
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    update(url: string, data: any){
        return this.http.put(url, data, { headers: this.headers })
        .toPromise()
        .then(() => null)
        .catch(this.handleError)
    }

    private extractData(res: Response) {
        return res.json();
    }

    private handleError(error: any) {
        return Observable.throw(error.json().error || 'Server error');
    }
}