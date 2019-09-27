import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import * as JSC from 'mg-lib-jscharting';
@Component({
  selector: 'app-activity-chart',
  templateUrl: './activity-chart.component.html',
  styleUrls: ['./activity-chart.component.less']
})
export class ActivityChartComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('chartTargetElement', null) chartTargetElement: ElementRef;
  @Input() Data: any;
  private chart: any;
  private ListData: any = [];
  private Setting: any = {};
  private Legend: any = {};
  private ShowSetting: any = {
    visible: false,
    settimeout: 0,
    showtime: 0
  };
  private SeriesListData = {
    palette: [],
    points: []
  };
  ShowDivState = true;
  constructor(private changeDetector: ChangeDetectorRef) { }
  ngOnInit() {
    this.ListData = this.Data.ListData;
    this.Setting = this.Data.Setting;
    this.ShowSetting = this.Data.Setting.showset;
    this.Legend = {
      visible: true,
      position: 'left',
      defaultEntry_style_color: this.ListData.slice(-1)[0].color
    };
    this.ListData.forEach((item, index) => {
      this.SeriesListData.palette.push(item.color);
      if (this.ShowSetting.visible) {
        this.ShowDivState = false;
        this.SeriesListData.points.push({
          x: item.name,
          z: item.value,
          y: 5,
        });
      } else {
        this.SeriesListData.points.push({
          x: item.name,
          z: item.value,
          y: item.scale,
        });
      }
    });
  }
  ngAfterViewInit(): void {
    if (this.Data.ListData) {
      if (this.ShowSetting.visible) {
        setTimeout(() => {
          this.ShowDivState = true;
          this.changeDetector.detectChanges();
          this.InitCharting();
        }, this.ShowSetting.settimeout || 0);
      } else {
        this.InitCharting();
      }

    }
  }
  InitCharting() {
    this.chart = new JSC.Chart({
      targetElement: this.chartTargetElement.nativeElement,
      debug: false,
      type: 'gauge ',
      width: this.Setting.width || 350,
      height: this.Setting.height || 300,
      legend: this.Setting.legend || this.Legend,
      xAxis: {
        spacingPercentage: 0.25,
        visible: true,
        defaultTick: {
          enabled: true,
          gridLine_color: '#29473B'
        }
      },
      box_outline_visible: false,
      defaultBox_boxVisible: false,
      toolbar_items_export_visible: false,
      defaultTooltip: {
        enabled: true,
        fill: '#fff'
      },
      yAxis: {
        defaultTick_label_text: '%value%',
        line_width: 0,
        scale_range: [0, 100],
        visible: false
      },
      defaultSeries: {
        type: 'column roundCaps',
        angle: {
          sweep: 360,
          start: -90
        },
        shape_innerSize: '0%',
        defaultPoint: {
          outline_width: 0,
          outline_visible: false,
          legendEntry_value: '%zValue',
          tooltip: '%zValue'
        },
        pointSelection: false,
        // defaultPoint_label_text: '%value%'
      },
      series: [{
        palette: this.SeriesListData.palette,
        points: this.SeriesListData.points
      }],
      events: {
        load: () => {
          if (this.ShowSetting.visible) {
            setTimeout(() => {
              this.chart.series().points().items.forEach((element, index) => {
                element.options({
                  y: this.ListData[index].scale
                }, {
                  animation: {
                    duration: this.ShowSetting.showtime || 1000,
                    easing: 'none'
                  }
                });
              });
            }, 0);
          }
        }
      }
    }, null);
  }
  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.dispose();
    }
  }
}
