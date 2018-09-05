import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SearchComponent} from './search/search.component';
import {ShowcaseComponent} from './showcase/showcase.component';
import {NewBookComponent} from './new-book/new-book.component';
import {DetailComponent} from './detail/detail.component';

const routes: Routes = [
    {path: 'showcase', component: ShowcaseComponent},
    {path: 'detail/:id', component: DetailComponent},
    {path: 'book/new', component: NewBookComponent},
    {path: 'book/:id', component: NewBookComponent},
    {path: 'search', component: SearchComponent},
    {path: '**', redirectTo: '/showcase', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
