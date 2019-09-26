# MgNgJscharting

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## 引用
安装包：yarn add mg-lib-jscharting

在app.module.ts中
```javascript
import { MgNgJschartingModule } from './modules/mg-ng-jscharting/mg-ng-jscharting.module';

imports: [
    ...
    MgNgJschartingModule
]
```
## 展示
<app-activity-chart [Data]="jschartingdata"></app-activity-chart>

## 参数设置
```javascript
export class Data {
  [key: string]: any;
}
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
    }
};
jschartingdata: Data = new Data();
this.jschartingdata = {
      ListData: this.ListData,
      Setting: this.Setting
};
```