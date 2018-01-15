import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ProductService {

  private dataSource: Observable<any>;
  private products: Observable<Proudct[]>;
  private comments: Array<Comment>;
  private anaylse: AnalyseInfo;
  private info: string;
  constructor( private http: HttpClient ) {
  }

  getProudcts(info: string): Observable<Proudct[]> {
    this.info = info;
    // this.dataSource = this.http.post('/api/jd', null, {
    this.dataSource = this.http.get('/search/jd', {
      params: {'name': this.info} }
    );
    this.dataSource.subscribe( (data) => this.products = data );
    return this.products;
  }
  changPage(page: string): Observable<Proudct[]> {
    // this.dataSource = this.http.get('/api/jd/shoplist', { params: {'page': page}});
    this.dataSource = this.http.get('/search/jd/shoplist', { params: {'shopname': this.info, 'page': page}});
    this.dataSource.subscribe( (data) => this.products = data );
    return this.products;
  }

  getComents(info: string, id: string): Array<Comment> {
    this.dataSource = this.http.get('/search/jd/comment', { params: {'shopname': info, 'item_id': id }});
    // this.dataSource = this.http.get('/api/jd/comment', { params: {'shopname': product.item_name, 'item_id': product.item_id }});
    this.comments = new Array<Comment>();
    this.dataSource.subscribe( data => {
      for ( const value in data ) {
        if ( value != '') {
          const te: Comment = new Comment(data[value]['content'], data[value]['creationTime'], data[value]['nickname'], data[value]['productColor'], data[value]['productSize'], data[value]['score'], data[value]['userClientShow'], data[value]['userLevelName']);
          this.comments.push(te);
        }
      }
    } );
    return this.comments;
  }

  getSum(info: string, id: string): AnalyseInfo {
    console.log(1);
    this.dataSource = this.http.get('/search/jd/productsum', { params: {'shopname': info, 'item_id': id }});
    console.log(2);
    // this.dataSource.toPromise().then( (data) => this.anaylse = this.getInfo(data) );
    this.dataSource.subscribe( (data) => {
      // this.anaylse = this.getInfo(data);
      console.log(3);
      console.log('data = ' + data);
      //   获取到评价信息
      const Trate: Rate = new Rate(data[0]['GoodRate'], data[0]['GeneralRate'], data[0]['PoorRate']);
      //   获取到月份评论信息
      const mo: number[] = [];
      let ind: number = Number(0);
      for ( const value in data[1] ) {
        if ( value != '' ) {
          mo[ind] = data[1][value];
          ind  = Number(ind + 1);
        }
      }
      //    获取手机和电脑评论人数
      const p: number = data[2]['computer'];
      const m: number = data[2]['mobile'];
      //    获取size以及人数
      let tete = data[3];
      ind = Number(0);
      const psize: string[] = [];
      const sizeN: number[] = [];
      for ( const ttt in tete ) {
        if ( ttt != '' ) {
          psize[ind] = ttt;
          sizeN[ind] = tete[ttt];
          ind = Number( ind + 1 );
        }
      }
      //    获取颜色以及数量
      tete = data[4];
      ind = Number(0);
      const pcolor: string[] = [];
      const colorN: number[] = [];
      for ( const ttt in tete ) {
        if ( ttt != '' ) {
          pcolor[ind] = ttt;
          colorN[ind] = tete[ttt];
          ind = Number( ind + 1 );
        }
      }
      this.anaylse = new AnalyseInfo(Trate, mo, p, m, psize, sizeN, pcolor, colorN);
    } );
    console.log(4);
    return this.anaylse;
  }
  getInfo(data: any): AnalyseInfo {
    console.log(3);
    console.log('data = ' + data);
    //   获取到评价信息
    const Trate: Rate = new Rate(data[0]['GoodRate'], data[0]['GeneralRate'], data[0]['PoorRate']);
    //   获取到月份评论信息
    const mo: number[] = [];
    let ind: number = Number(0);
    for ( const value in data[1] ) {
      if ( value != '' ) {
        mo[ind] = data[1][value];
        ind  = Number(ind + 1);
      }
    }
    //    获取手机和电脑评论人数
    const p: number = data[2]['computer'];
    const m: number = data[2]['mobile'];
    //    获取size以及人数
    let tete = data[3];
    ind = Number(0);
    const psize: string[] = [];
    const sizeN: number[] = [];
    for ( const ttt in tete ) {
      if ( ttt != '' ) {
        psize[ind] = ttt;
        sizeN[ind] = tete[ttt];
        ind = Number( ind + 1 );
      }
    }
    //    获取颜色以及数量
    tete = data[4];
    ind = Number(0);
    const pcolor: string[] = [];
    const colorN: number[] = [];
    for ( const ttt in tete ) {
      if ( ttt != '' ) {
        pcolor[ind] = ttt;
        colorN[ind] = tete[ttt];
        ind = Number( ind + 1 );
      }
    }
    this.anaylse = new AnalyseInfo(Trate, mo, p, m, psize, sizeN, pcolor, colorN);
    return this.anaylse;
  }
  getInfos(): AnalyseInfo {
    return this.anaylse;
  }
}

export class Proudct {
  constructor (
    public item_id: string,
    public item_name: string,
    public introduction: string,
    public item_price: string,
    public src: string
  ) {
  }
}

export class Comment {
  constructor (
    public content: string,
    public creationTime: string,
    public nickname: string,
    public productColor: string,
    public productSize: string,
    public score: number,
    public userClientShow: string,
    public userLevelName: string
  ) {
  }
}
export class AnalyseInfo {
  constructor(
    public rate: Rate,
    public moths: number[],
    public Pnumber: number,
    public Mnumber: number,
    public productSize: string[],
    public sizeNumber: number[],
  public productColor: string[],
  public colorNumber: number[]
  ) {
  }
}

export class Rate {
  constructor(
    public GoodRate: number,
    public GeneralRate: number,
    public PoorRate: number
  ) {
  }
}
