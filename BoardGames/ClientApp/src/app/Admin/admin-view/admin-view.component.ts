import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
//import { AddgameComponent } from '../addgame/addgame.component';
import { NotificationService } from 'src/app/shared/alert/notification.service';
import { AdminService } from 'src/app/shared/admin.service';
import { AdminvistordetailsComponent } from '../adminvistordetails/adminvistordetails.component';
import { LoginService } from 'src/app/shared/login/login.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})

export class AdminViewComponent implements OnInit {
  constructor(private _adminService: AdminService, private dialog: MatDialog, private notificationService: NotificationService
    , public loginService: LoginService, private router: Router
  ) {
  }

  public listData: MatTableDataSource<any>;
  public displayedColumns: string[] = ['srno', 'gameName', 'visitorCount', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;


  public gameList;



  // Function to call Game Details Table
  public LoadGameTable() {
    this._adminService.GetVisitorGamesRatingDetails().subscribe(
      result => {
        this.gameList = result;
        let i = 1;
        this.gameList.forEach(element => {
          element.visitorExistsFlag = element.visitorCount > 0 ? true : false;
          element.srno = i;
          i = i + 1;
        });
        this.listData = new MatTableDataSource(this.gameList);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        console.log('data has come!');
      }
      , error => console.error(error));
  }

  // Intialize list data and show in Material grid table
  ngOnInit() {
    if (!this.loginService.isLoggedIn) {
      this.router.navigate(['/visitor-rating']);
    } else {
      this.LoadGameTable();
    }

  }

  // Function to clear serach item
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }


  // Function to apply filter on search
  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  // Function to call Add Game DialogBox Component- fires on click of "+Add Game"
  onCreate() {
    const dialogRef = this.dialog.open(AddgameComponent, {
      width: '20%',minWidth:'300px'});
    

    // Refresh the Game Table
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.LoadGameTable();
    });
  }

  // Function to call Delete Game - fires on click of "Delete button"
  onDelete(row) {
    if (confirm('Are you sure to delete this record ?')) {
      this._adminService.DeleteGame(row.gameId).subscribe(res => {
        console.log('delete record');
        this.notificationService.warn('Game: ' + row.gameName + ' Deleted successfully!');
        this.LoadGameTable();
      }, error => console.error(error));

    }
  }

  // Function to get visitor info on click of visitorCount column
  GetVisitorInfo(record) {
    this._adminService.rowData = record.visitors;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
   dialogConfig.minWidth='300px';
    this.dialog.open(AdminvistordetailsComponent, dialogConfig);
  }
}

// Add game Component functionality here
@Component({
  selector: 'app-addgame',
  templateUrl: '../addgame/addgame.component.html'
})

export class AddgameComponent {
  constructor(private _adminService: AdminService, private formBuilder: FormBuilder, private notificationService: NotificationService,
    public dialogRef: MatDialogRef<AddgameComponent>
  ) { }
  public gamename = '';
  AddGameForm: FormGroup;
    submitted = false;

  // Function to cancel the game - on click of cancel from dialog
  onCancel(): void {
    this.dialogRef.close();
  }

  //Function to add Game  - on click of add from dialog
  onAdd(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.AddGameForm.invalid) {
        return;
    }
    this._adminService.AddGame(this.gamename).subscribe(
      result => {
        console.log('game added');
        this.notificationService.success('Game Added successfully!');
        this.dialogRef.close();
      }, error => console.error(error));
  }

  ngOnInit() {
    this.AddGameForm = this.formBuilder.group({
      gamename: ['', Validators.required]
  });
  }
   // convenience getter for easy access to form fields
   get f() { return this.AddGameForm.controls; }

}
