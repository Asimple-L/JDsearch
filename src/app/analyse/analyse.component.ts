import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AnalyseInfo, ProductService, Rate} from '../shared/product.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-analyse',
  templateUrl: './analyse.component.html',
  styleUrls: ['./analyse.component.css']
})
export class AnalyseComponent implements OnInit {

  anaylse: AnalyseInfo;
  info: string;
  id: string;
  yun: string[];
  dataSource: Observable<any>;
  dataSource2: Observable<any>;
  DatMap;
  SizeMap;
  Radar;
  ColorMap;
  te: Array<A>;
  constructor(private routes: ActivatedRoute,
              private productService: ProductService,
              private http: HttpClient
  ) {
    this.info = this.routes.snapshot.queryParams['info'];
    this.id = this.routes.snapshot.queryParams['id'];
  }

  ngOnInit() {
    this.dataSource = this.http.get('/search/jd/productsum', { params: {'shopname': this.info, 'item_id': this.id }});
    this.dataSource2 = this.http.get('/search/jd/commentkey', { params: {'shopname': this.info, 'item_id': this.id }});
    this.dataSource.subscribe( (data) => {
        this.getInfo(data);
      this.DatMap = this.getOption(this.anaylse);
      this.SizeMap = this.getBing(this.anaylse);
      this.Radar = this.getZ(this.anaylse);
      this.ColorMap = this.getBingcolor(this.anaylse);
    } );
    this.dataSource2.subscribe( (data) => this.yun = data );
    console.log('yun = ' + this.yun );
  }

  /***
   *   日期评论柱状图
   * */
  getOption(info: AnalyseInfo): any {
    const chartOption1 = {
      color: ['#3398DB'],
      title: {
        text: '评论日期柱状图'
      },
      tooltip: {},
      legend: {
        data: ['评论数']
      },
      xAxis: {
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      },
      toolbox: {
        show : true,
        feature : {
          mark : {show: true},
          restore : {show: true},
          saveAsImage : {
            show: true,
            pixelRatio: 1,
            title : '保存为图片',
            type : 'png',
            lang : ['点击保存']
          }
        }
      },
      yAxis: {},
      series: [{
        name: '评论数',
        type: 'bar',
        data: info.moths
      }]
    };
    return chartOption1;
  }
  /***
   *  饼状图
   * **/
  getBing(info: AnalyseInfo): any {
    const Psize = info.productSize;
    const Nsize = info.sizeNumber;
    this.te = new Array<A>();
    for (const t in Psize ) {
      if ( typeof t != 'undefined' ) {
        const te: A = new A(Nsize[t], Psize[t]);
        this.te.push(te);
      }
    }
    const option1 = {
      title : {
        text: '商品大小比例图',
        x: 'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      toolbox: {
        show : true,
        feature : {
          mark : {show: true},
          restore : {show: true},
          saveAsImage : {
            show: true,
            pixelRatio: 1,
            title : '保存为图片',
            type : 'png',
            lang : ['点击保存']
          }
        }
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: info.productSize
      },
      series : [
        {
          name: '商品大小',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data: this.te,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    return option1;
  }
  getBingcolor(info: AnalyseInfo): any {
    const Psize = info.productColor;
    const Nsize = info.colorNumber;
    this.te = new Array<A>();
    for (const t in Psize ) {
      if ( typeof t != 'undefined' ) {
        const te: A = new A(Nsize[t], Psize[t]);
        this.te.push(te);
      }
    }
    const option1 = {
      title : {
        text: '商品颜色比例图',
        x: 'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      toolbox: {
        show : true,
        feature : {
          mark : {show: true},
          restore : {show: true},
          saveAsImage : {
            show: true,
            pixelRatio: 1,
            title : '保存为图片',
            type : 'png',
            lang : ['点击保存']
          }
        }
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: info.productColor
      },
      series : [
        {
          name: '商品颜色',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data: this.te,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    return option1;
  }
  /***
   *  折线图
   * **/
  getZ(info: AnalyseInfo): any {
    const option = {
      title: {
        text: '评论折线趋势'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['评论人数']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        show : true,
        feature : {
          mark : {show: true},
          restore : {show: true},
          saveAsImage : {
            show: true,
            pixelRatio: 1,
            title : '保存为图片',
            type : 'png',
            lang : ['点击保存']
          }
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '评论人数',
          type: 'line',
          stack: '人数',
          data: info.moths
        }
      ]
    };
    return option;
  }

  getInfo(data: any) {
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
  }

}
export class A {
  constructor(
    public value: number,
    public name: string
  ) {
  }
}

