import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  info: string;
  dataSource: Observable<any>;
  constructor(private http: HttpClient) {
    this.dataSource = this.http.post('/search/', '123');
    this.dataSource.subscribe( (data) => this.info = data );
  }

  ngOnInit() {
  }

}
