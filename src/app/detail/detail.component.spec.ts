import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailComponent } from './detail.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {browser} from 'protractor';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailComponent],
      imports: [ReactiveFormsModule, HttpClientModule, RouterModule.forRoot([])]})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
