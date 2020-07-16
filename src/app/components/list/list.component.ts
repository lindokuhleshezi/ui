import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { PartsService } from 'src/app/service/parts.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  isLoading = true;
  public parts = [];
  title = 'Parts';
  dtOptions: DataTables.Settings = {};

  constructor(
    private partsService: PartsService, private rout: Router) { }

  ngOnInit(): void {
    this.loadData();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
  }

  loadData() {
    this.partsService.getList().subscribe(
      response => {
        this.parts = response.part_list;
        this.isLoading = false;
        // this.dataSource = new MatTableDataSource(this.parts);
      }, error => {
        console.log('error occured retriveing parts list ', error);
      });
  }

  viewDetails(id: number) {
    this.rout.navigate(['../info', id]);


  }

}
