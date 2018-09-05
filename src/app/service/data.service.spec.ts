import {TestBed, inject} from '@angular/core/testing';
import {DataService} from './data.service';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

describe('DataService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DataService],
            imports: [ReactiveFormsModule, HttpClientModule]
        });
    });

    it('should be created', inject([DataService], (service: DataService) => {
        expect(service).toBeTruthy();
    }));
});
