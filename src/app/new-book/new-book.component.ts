import {City} from '../interfaces/city';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../service/http.service';
import {NotificationsService} from 'angular2-notifications';
import {DataService} from '../service/data.service';
import {Country} from '../interfaces/country';
import {Company} from '../interfaces/company';

@Component({
    selector: 'app-book',
    templateUrl: './new-book.component.html'
})

export class NewBookComponent implements OnInit {
    public form: FormGroup;
    public selectedCity: City = null;
    public selectedCountry: Country = null;
    public submitted: boolean = false;

    constructor(public dataService: DataService,
                private notifications: NotificationsService,
                private formBuilder: FormBuilder,
                private httpService: HttpService) {
        this.form = this.formBuilder.group({
            author: [null, [Validators.required, Validators.pattern(/^[A-z0-9]*$/), Validators.minLength(3)]],
            title: [null, [Validators.required, Validators.pattern(/^[A-z0-9]*$/), Validators.minLength(3)]],
            isbn: [null, [Validators.required, Validators.pattern(/^[A-z0-9]*$/), Validators.minLength(3)]],
            pages: [null, [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(3)]],
            format: [null, [Validators.required]],
            description: [null, [Validators.required, Validators.pattern(/^[A-zА-я0-9]*$/), Validators.minLength(3)]],
            price: [null, [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(3)]],
            country: [null, [Validators.required]],
            city: [null, [Validators.required]],
            company: [null, [Validators.required]],
        });
    }

    ngOnInit(): void {
        this.form.controls['city'].disable();
        this.form.controls['company'].disable();
    }

    onSave(): void {
        this.submitted = true;
        if (this.form.status === 'VALID') {
            const request = {
                author: this.form.value.author,
                title: this.form.value.title,
                isbn: this.form.value.isbn,
                pages: this.form.value.pages,
                formatId: this.form.value.format.id,
                description: this.form.value.description,
                price: this.form.value.price,
                countryId: this.form.value.country.id,
                cityId: this.form.value.city.id,
                companyId: this.form.value.company.id,
            };
            this.httpService.postData('books', request).subscribe(
                (result) => {
                    this.dataService.onLoadBooks();
                    this.notifications.success('Done', 'New book is added');
                },
                error => {
                    this.notifications.error(error);
                }
            );
        } else {
            this.notifications.error('error', 'Field is required');
        }
    }

    onCityChanged(city: City): Company[]  {
        return city ? this.form.controls['company'].enable() ||
            this.dataService.companies.filter(company => city.id === company.cityId) : this.dataService.companies;
    }

    onCountryChanged(country: Country): City[] {
        return country ? this.form.controls['city'].enable() ||
            this.dataService.cities.filter(city => country.id === city.countryId) : this.dataService.cities;
    }
}
