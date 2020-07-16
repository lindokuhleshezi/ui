import { Component, OnInit, ViewChild } from '@angular/core';
import { PartsService } from 'src/app/service/parts.service';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color, BaseChartDirective } from 'ng2-charts';
import { PartySales } from 'src/app/PartySales';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  partySales: PartySales[] = [];

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Series A' },
    { data: [], label: 'Series B' },

  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [{
        type: 'line',
        mode: 'vertical',
        scaleID: 'x-axis-0',
        value: 'March',
        borderColor: 'orange',
        borderWidth: 2
      }
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'red',
      borderColor: 'red',
      pointBackgroundColor: 'red',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  loading = true;

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
  constructor(private partsService: PartsService, private activatedRout: ActivatedRoute) { }

  ngOnInit(): void {
    // tslint:disable-next-line: variable-name
    const part_id = this.activatedRout.snapshot.params.id;
    this.partsService.getDetails(part_id).subscribe(
      response => {
        this.partySales = response.part_sales_data;
        this.filterByDate();
      }, error => {
        console.log('error occured retriveing parts list ', error);
      });

  }
  public isFuture(transactionDate: any): boolean {
    if (Date.parse(transactionDate) < new Date().getTime()) {
      return false;
    }
    return true;
  }
  public filterByDate() {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.partySales.length; i++) {
      console.log(this.partySales[i].TransactionDate, ' is future:', this.isFuture(this.partySales[i].TransactionDate));
      const date = new Date(this.partySales[i].TransactionDate);
      const label = date.getFullYear() + '-' + this.adddigit((1 + date.getMonth())) + '-' + this.adddigit(date.getDate());

      if (this.isFuture(this.partySales[i].TransactionDate)) {
        this.lineChartData[0].data[this.lineChartData[0].data.length + 1] = this.partySales[i].Sales;
        this.lineChartLabels.push(label);
      } else {
        this.lineChartData[1].data[this.lineChartData[1].data.length + 1] = this.partySales[i].Sales;
        this.lineChartLabels.push(label);
      }
    }
    this.loading = false;
  }
  public adddigit(param: number): string {
    if (param < 10) {
      return '0' + param;
    }
    return param + '';
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
