import {Component, Input, OnInit} from '@angular/core';
import {Book} from '../interfaces/book';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HttpService} from '../service/http.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DataService} from '../service/data.service';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html'
})

export class DetailComponent implements OnInit {
    @Input() book: Book;
    public form: FormGroup;

    constructor(public dataService: DataService,
                private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private httpService: HttpService) {
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
        author: [{value: '', disabled: true}],
        title: [{value: '', disabled: true}],
        isbn: [{value: '', disabled: true}],
        pages: [{value: '', disabled: true}],
        format: [{value: '', disabled: true}],
        description: [{value: '', disabled: true}],
        price: [{value: '', disabled: true}],
        country: [{value: '', disabled: true}],
        city: [{value: '', disabled: true}],
        company: [{value: '', disabled: true}]
    });
        this.route.params.forEach((params: Params) => {
            if (params['id'] !== undefined) {
                const id: number = +params['id'];
                this.httpService.getData('books/' + id).subscribe((book: Book) => {
                    this.book = book;
                    this.form.patchValue(
                        {
                            author: this.book.author,
                            title: this.book.title,
                            isbn: this.book.isbn,
                            format: this.dataService.formats.filter(f => f.id === +this.book.formatId)[0].name,
                            city: this.dataService.cities.filter(f => f.id === +this.book.cityId)[0].name,
                            company: this.dataService.companies.filter(f => f.id === +this.book.companyId)[0].name,
                            country: this.dataService.countries.filter(f => f.id === +this.book.countryId)[0].name,
                            price: this.book.price,
                            pages: this.book.pages,
                            description: this.book.description
                        }
                    );
                });
            } else {
                // this.book = new Book();
            }
        });
    }
}
