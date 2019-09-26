import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityChartComponent } from './components/activity-chart/activity-chart.component';

@NgModule({
  declarations: [ActivityChartComponent],
  imports: [
    CommonModule
  ],
  exports: [ActivityChartComponent]
})
export class MgNgJschartingModule { }
