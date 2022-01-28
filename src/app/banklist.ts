import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ApiserviceService } from './services/apiservice.service';

/**
 * @title MANICKAM FIRST ASSIGNMENT
 */
@ Component({
  selector: 'banklist',
  styleUrls: ['banklist.css'],
  templateUrl: 'banklist.html',
})

export class BankList implements AfterViewInit {
  statelist: string[] = ['MUMBAI','TAMILNADU', 'KERALA', 'CHENNAI', 'KARNATAKA'];
  selectedstate: string = 'MUMBAI';
  displayedColumns: string[] = ['IFSC', 'Branch', 'Bank Name', 'Address'];
  currentbanklist:any = [];
  dataSource:any = [];
  serchkey: string = '';
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor( private apiservice:ApiserviceService){}
  
  ngOnInit(){
    this.apiservice.getbankslist('MUMBAI').subscribe(data => {
      this.currentbanklist = data;
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.currentbanklist);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }
  changecity(cityname:string){
    this.apiservice.getbankslist(cityname).subscribe(data => {
      this.currentbanklist = data;
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.currentbanklist);
      this.dataSource.paginator = this.paginator;
    });

  }
  onsearchclear(){
    this.serchkey = '';
    this.applyFilter();
  }
  applyFilter(){
    this.dataSource.filter = this.serchkey.trim().toLowerCase();
  }
}

export interface PeriodicElement {
  ifsc: string;
  bank_id: number;
  branch: string;
  address: string;
  city: string;
  district: string;
  state: string;  
  bank_name: string;
}