import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import * as JSC from '../../../../../assets/node_modules/jscharting/dist/jscharting';
@Component({
  selector: 'app-activity-chart',
  templateUrl: './activity-chart.component.html',
  styleUrls: ['./activity-chart.component.less']
})
export class ActivityChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chartTargetElement', null) chartTargetElement: ElementRef;
  @Input() Data: any;

  private chart: any;
  private ListData: any = [];
  private Setting: any = {};
  private Legend: any = {};
  private SeriesListData = {
    palette: [],
    points: []
  };
  ngAfterViewInit(): void {
    if (this.Data.ListData) {
      this.ListData = this.Data.ListData;
      this.Setting = this.Data.Setting;
      this.Legend = {
        visible: true,
        position: 'left',
        defaultEntry_style_color: this.ListData.slice(-1)[0].color
      };
      this.ListData.forEach((item, index) => {
        this.SeriesListData.palette.push(item.color);
        this.SeriesListData.points.push({
          x: item.name,
          z: item.value,
          y: 5,
        });
      });
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
            setTimeout(() => {
              this.chart.series().points().items.forEach((element, index) => {
                element.options({
                  y: this.ListData[index].scale
                }, {
                  animation: {
                    duration: 1000,
                    easing: 'none'
                  }
                });
              });
            }, 0);
          },
        }
      }, null);
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.dispose();
    }
  }
}
