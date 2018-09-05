import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Book} from '../interfaces/book';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

@Injectable()
export class HttpService {
    private server: string = environment.apiUrl;
    public authToken: string = environment.authToken;
    public authHeader: string = environment.authHeader;
    public headers = {};

    constructor(private http: HttpClient) {
    }

    getData(url): Observable<any> {
        this.headers[this.authHeader] = this.authToken;
        return this.http.get<Book>(this.server + url, {headers: this.headers});
    }

    postData(url, data): Observable<any> {
        this.headers[this.authHeader] = this.authToken;
        return this.http.post(this.server + url, data, {headers: this.headers});
    }
    //
    // putData(url, data): Observable<any> {
    //     return this.http.put(this.server + url, data, {observe: 'response'}).pipe(map(res => res.body));
    // }
    //
    // patchData(url, data): Observable<any> {
    //     return this.http.patch(this.server + url, data, {observe: 'response'}).pipe(map(res => res.body));
    // }
    //
    // delData(url): Observable<any> {
    //     return this.http.delete(this.server + url, {observe: 'response'}).pipe(map(res => res.body));
    // }
}

