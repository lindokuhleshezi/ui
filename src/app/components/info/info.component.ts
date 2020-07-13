import { Component, OnInit, ViewChild } from '@angular/core';
import { PartsService } from 'src/app/service/parts.service';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color, BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
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
      annotations: [
        {
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

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
  constructor(private partsService: PartsService, private activatedRout: ActivatedRoute) { }

  ngOnInit(): void {
    // tslint:disable-next-line: variable-name
    const part_id = this.activatedRout.snapshot.params.id;
    this.partsService.getDetails(part_id).subscribe(
      response => {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < response.part_sales_data.length; i++) {
          if (Date.parse(response.part_sales_data[i].TransactionDate) < new Date().getTime()) {

            this.lineChartData[0].data[this.lineChartData[0].data.length + 1] = response.part_sales_data[i].Sales ;
            this.lineChartLabels.push(response.part_sales_data[i].TransactionDate);

          }
          else{

            this.lineChartData[1].data[this.lineChartData[1].data.length + 1] = response.part_sales_data[i].Sales;
            this.lineChartLabels.push(response.part_sales_data[i].TransactionDate);
          }
        }
      }, error => {
        console.log('error occured retriveing parts list ', error);
      });
  }


  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
