import { Component, OnInit } from '@angular/core';
import {ProductService, Comment} from '../shared/product.service';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  comentsInfo: Array<Comment> = new Array<Comment>();
  id: string;
  name: string;
  constructor(private routerInfo: ActivatedRoute,
                private producrService: ProductService ) {
    this.id = this.routerInfo.snapshot.queryParams['ProductID'];
    this.name = this.routerInfo.snapshot.queryParams['name'];
  }

  ngOnInit() {
    this.comentsInfo = this.producrService.getComents(this.name, this.id);
  }
}
