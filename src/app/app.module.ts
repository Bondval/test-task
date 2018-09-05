import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {NewBookComponent} from './new-book/new-book.component';
import {NavigationComponent} from './navigation/navigation.component';
import {ShowcaseComponent} from './showcase/showcase.component';
import {SearchComponent} from './search/search.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {DetailComponent} from './detail/detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SimpleNotificationsModule, Options } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const NOTIFICATION_OPTION: Options = {
    position: ['bottom', 'right'],
    timeOut: 5000,
    pauseOnHover: true,
    clickToClose: true,
    animate: 'scale'
};

@NgModule({
    declarations: [
        AppComponent,
        NewBookComponent,
        NavigationComponent,
        ShowcaseComponent,
        SearchComponent,
        DetailComponent,
    ],
    imports: [
        SimpleNotificationsModule.forRoot(NOTIFICATION_OPTION),
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule
    ],
    providers: [HttpClient],
    bootstrap: [AppComponent]
})
export class AppModule {
}
