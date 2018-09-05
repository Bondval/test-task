import {EventEmitter, Injectable} from '@angular/core';
import {HttpService} from './http.service';

import {Company} from '../interfaces/company';
import {Country} from '../interfaces/country';
import {City} from '../interfaces/city';
import {Format} from '../interfaces/format';
import {Book} from '../interfaces/book';

@Injectable({
    providedIn: 'root'
})

export class DataService {
    public books: Book[] = [];
    public countries: Country[] = [];
    public cities: City[] = [];
    public formats: Format[] = [];
    public companies: Company[] = [];
    public isLoadedBook: EventEmitter<any> = new EventEmitter<any>();

    constructor(private httpService: HttpService) {
        this.httpService.getData('countries').subscribe(
            (result) => {
                this.countries = result;
            },
            error => {
                console.log(error);
            }
        );
        this.httpService.getData('formats').subscribe(
            (result) => {
                this.formats = result;
            },
            error => {
                console.log(error);
            }
        );
        this.httpService.getData('cities').subscribe(
            (result) => {
                this.cities = result;
            },
            error => {
                console.log(error);
            }
        );
        this.httpService.getData('companies').subscribe(
            (result) => {
                this.companies = result;
            },
            error => {
                console.log(error);
            }
        );
        this.onLoadBooks();
    }

    public onLoadBooks(): void {
        this.httpService.getData('books').subscribe(
            (result) => {
                this.books = result;
                this.isLoadedBook.emit();
            },
            error => {
                console.log(error);
            }
        );
    }
}
