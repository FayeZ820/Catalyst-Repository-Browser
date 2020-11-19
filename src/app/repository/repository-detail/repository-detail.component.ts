import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
} from 'ng-apexcharts';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GridItem } from 'src/app/shared/entities/grid-item';
import { Contributor } from '../../shared/entities/contributor';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};

@Component({
  selector: 'app-repository-detail',
  templateUrl: './repository-detail.component.html',
  styleUrls: ['./repository-detail.component.scss']
})
export class RepositoryDetailComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  state$: Observable<object>;
  item: GridItem;
  contributors: Contributor[];
  contributions: number[];
  contributorNames: string[];

  constructor(public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.state$ = this.activatedRoute.paramMap.pipe(
      map(() => window.history.state)
    );

    this.state$.subscribe((s) => {
      this.contributors = s['contributor'];
      console.log('obje', s['contributor']);
    });
    this.contributions = this.contributors.map((x) => x.contributions);
    this.contributorNames = this.contributors.map((x) => x.login);
    console.log('contributors', this.contributors);
    console.log('contributions', this.contributions);
    console.log('contributorNames', this.contributorNames);

    this.chartOptions = {
      series: [
        {
          name: 'basic',
          data: this.contributions,
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: this.contributorNames,
      },
    };
  }

}