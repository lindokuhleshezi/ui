import { Component, OnInit } from '@angular/core';
import { PartsService } from 'src/app/service/parts.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'part_description', 'action'];
  parts: any[] = [];
  dataSource = new MatTableDataSource(this.parts);

  constructor(private partsService: PartsService, private rout: Router) { }

  ngOnInit(): void {
    this.partsService.getList().subscribe(
      response => {
        console.log(response.part_list);
        this.dataSource = new MatTableDataSource(response.part_list);
      }, error => {
        console.log('error occured retriveing parts list ', error);
      });
  }
  viewDetails(id: number) {
    this.rout.navigate(['../info', id]);


  }

}
