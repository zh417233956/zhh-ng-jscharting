import { Component, OnInit } from '@angular/core';
export class Data {
  [key: string]: any;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit {
  title = 'mg-ng-jscharting';
  private ListData: any = [{
    color: '#f7d3ff',
    name: '年入职人数',
    // 显示的值
    value: 2310,
    // 所占的百分比
    scale: 70
  }, {
    color: '#d1afff',
    name: '年离职人数',
    value: 1520,
    scale: 80
  }, {
    color: '#836af9',
    name: '年总人数',
    value: 5571,
    scale: 110
  }];
  private Setting: any = {
    width: 600,
    height: 600,
    legend: {
      // 显示隐藏
      visible: true,
      // 显示位置
      position: 'left',
      offset: '50,180',
      // 字体颜色
      defaultEntry_style_color: this.ListData.slice(-1)[0].color
    },
    showset:
    {
      visible: true,
      settimeout: 50,
      showtime: 3000
    }
  };
  jschartingdata: Data = new Data();
  constructor() { }
  ngOnInit() {
    this.jschartingdata = {
      ListData: this.ListData,
      Setting: this.Setting
    };
  }


}
