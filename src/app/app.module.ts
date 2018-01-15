import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { InputComponent } from './input/input.component';
import { ShowComponent } from './show/show.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {SearchGuard} from './guard/search.guard';
import { TestComponent } from './test/test.component';
import { LeaderComponent } from './leader/leader.component';
import { ProductComponent } from './product/product.component';
import {ProductService} from './shared/product.service';
import { FilterPipe } from './pipe/filter.pipe';
import { CommentComponent } from './comment/comment.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { AnalyseComponent } from './analyse/analyse.component';

const routerConfig: Routes = [
  {path: '', component: IndexComponent},
  {path: 'show', canActivate: [SearchGuard], children: [
      {path: 'p/:Info', component: ProductComponent},
      {path: 'c', component: CommentComponent},
      {path: 'analyse', component: AnalyseComponent}
    ]},
];

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    InputComponent,
    ShowComponent,
    TestComponent,
    LeaderComponent,
    ProductComponent,
    FilterPipe,
    CommentComponent,
    AnalyseComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routerConfig),
    NgxEchartsModule
  ],
  providers: [SearchGuard, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
