import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogRef, MatSort, MatPaginator } from '@angular/material';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-adminvistordetails',
  templateUrl: './adminvistordetails.component.html',
  styleUrls: ['./adminvistordetails.component.css']
})

  // class for visitor name and rating on click of 'visitor count' admin page
export class AdminvistordetailsComponent implements OnInit {
  private rowdata:any;
  public listData: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns: string[] = ['visitorName','visitorRating'];
  constructor(private _adminService: AdminService,private dialog: MatDialog ,
    private dialogRef:MatDialogRef<AdminvistordetailsComponent>) { 
    
  }

  ngOnInit() {
    this.rowdata = this._adminService.rowData;
    this.listData = new MatTableDataSource(this.rowdata);
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
  }
  
  //Function to close the visitor details dialog
  closeDialog(){
    this.dialogRef.close();
  }
}
