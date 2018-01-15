import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {ProductService, Proudct} from '../shared/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  info: string;
  productInfos: Observable<Proudct[]>;
  page: string;
  constructor(private routeInfo: ActivatedRoute,
                private productService: ProductService ) {
    this.info = this.routeInfo.snapshot.params['Info'];
    this.page = '1';
    this.productInfos = this.productService.getProudcts(this.info);
  }

  ngOnInit() {
    this.productInfos = this.productService.changPage(this.page);
  }
  changeProPage(page: string) {
    if ( page == 'pre' ) {
      if ( this.page == '1' ) { return ; }
      const te: number = Number(this.page) - 1 ;
      page = te.toString();
    } else if ( page == 'next' ) {
      if ( this.page == '20' ) { return ; }
      const te: number = Number(this.page) + 1 ;
      page = te.toString();
    }
    this.page = page;
    this.productInfos = this.productService.changPage(page);
  }

}
