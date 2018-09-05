import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from '../service/http.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Book} from '../interfaces/book';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../service/data.service';
import {takeUntil} from 'rxjs/internal/operators';
import {Subject} from 'rxjs/index';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
    public displayedBooks: Book[] = [];
    public form: FormGroup;
    public orderForm;
    private componentDestroyed: Subject<void> = new Subject<void>();

    constructor(public dataService: DataService,
                private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                private httpService: HttpService,
                private router: Router) {
        this.form = this.formBuilder.group({
            author: [null],
            title: [null],
            isbn: [null],
            formatId: [null],
            priceMax: [null, [Validators.pattern(/^[0-9]*$/)]],
            priceMin: [null, [Validators.pattern(/^[0-9]*$/)]],
            pageMax: [null, [Validators.pattern(/^[0-9]*$/)]],
            pageMin: [null, [Validators.pattern(/^[0-9]*$/)]],
        });
    }

    ngOnInit() {
        this.onBooksLoaded();
        this.dataService.isLoadedBook
            .pipe(takeUntil(this.componentDestroyed))
            .subscribe(() => this.onBooksLoaded());
    }

    onBooksLoaded(): void {
        this.route.queryParamMap.subscribe(params => {
            this.orderForm = {...params};
            this.form.patchValue({
                author: this.orderForm.params.author,
                title: this.orderForm.params.title,
                isbn: this.orderForm.params.isbn,
                formatId: +this.orderForm.params.formatId || null,
                priceMax: this.orderForm.params.priceMax,
                priceMin: this.orderForm.params.priceMin,
                pageMax: this.orderForm.params.pageMax,
                pageMin: this.orderForm.params.pageMin
            });
        });
        this.displayedBooks = [...this.dataService.books];
        this.getFilteredBooks();
    }

    getFilteredBooks(): void {
        const value = this.form.value;

        this.displayedBooks = [...this.dataService.books.filter(function (book) {

            return (value.author && book.author.toLowerCase().search(value.author.toLowerCase()) === -1) ? false :
                (value.title && book.title.toLowerCase().search(value.title.toLowerCase()) === -1) ? false :
                    (value.isbn && book.isbn.toLowerCase().search(value.isbn.toLowerCase()) === -1) ? false :
                        (value.formatId && +value.formatId !== book.formatId) ? false :
                            (value.pageMin && value.pageMin > book.pages) ? false :
                                (value.pageMax && value.pageMax < book.pages) ? false :
                                    (value.priceMin && value.priceMin > book.price) ? false :
                                        (value.priceMax && value.priceMax < book.price) ? false : true;
        })];

        this.router.navigate([], {
            queryParams: {
                author: this.form.value.author,
                title: this.form.value.title,
                isbn: this.form.value.isbn,
                formatId: this.form.value.formatId,
                priceMax: this.form.value.priceMax,
                priceMin: this.form.value.priceMin,
                pageMax: this.form.value.pageMax,
                pageMin: this.form.value.pageMin
            }
        });
    }

    goToDetail(book: Book): void {
        const link: any[] = ['/detail', book.id];
        this.router.navigate(link, {
            queryParams: {
                author: this.form.value.author,
                title: this.form.value.title,
                isbn: this.form.value.isbn,
                format: this.form.value.formatId,
                priceMax: this.form.value.priceMax,
                priceMin: this.form.value.priceMin,
                pageMax: this.form.value.pageMax,
                pageMin: this.form.value.pageMin
            }
        });
    }

    ngOnDestroy(): void {
        this.componentDestroyed.next();
        this.componentDestroyed.unsubscribe();
    }
}
