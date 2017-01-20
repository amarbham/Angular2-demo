import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

    headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    get(url: string) {
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError)
    }

    post(url: string, data: any) {
        let options = new RequestOptions({ headers: this.headers });

        return this.http.post(url, data, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    delete(id: number) {
        return this.http.delete('http://localhost:3000/users/' + id, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        return res.json();
    }

    private handleError(error: any) {
        return Observable.throw(error.json().error || 'Server error');
    }
}