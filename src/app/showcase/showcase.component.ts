import { Component, OnInit } from '@angular/core';
import {Book} from '../interfaces/book';
import {Router} from '@angular/router';
import {DataService} from '../service/data.service';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
    styleUrls: ['./showcase.component.scss'],
})
export class ShowcaseComponent implements OnInit {
    constructor(
        private router: Router,
        public dataService: DataService) {
    }

    ngOnInit(): void {
    }

    goToDetail(book: Book): void {
        const link = ['/detail', book.id];
        this.router.navigate(link);
    }
}
