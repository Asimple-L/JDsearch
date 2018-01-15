import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  Info: string;
  constructor(private routeInfo: ActivatedRoute,
                private http: HttpClient) {
    this.Info = this.routeInfo.snapshot.params['Info'];
    console.log(this.Info);
    // this.http.get('/search/shop?page=1', ).subscribe( (date) => this.data = date );
  }

  ngOnInit() {
  }

}
