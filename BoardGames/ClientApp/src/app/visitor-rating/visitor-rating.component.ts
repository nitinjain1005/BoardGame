import { Component, OnInit, ViewChild } from '@angular/core';
import { GameService } from '../shared/game.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { element } from '@angular/core/src/render3/instructions';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/alert/notification.service';

@Component({
  selector: 'app-visitor-rating',
  templateUrl: './visitor-rating.component.html',
  styleUrls: ['./visitor-rating.component.css']
})
  // class for visitor rating
export class VisitorRatingComponent implements OnInit {

  constructor(private _gameService: GameService, public router: Router, private formBuilder: FormBuilder
    , private notificationService: NotificationService
    ) { }
  visitorForm: FormGroup;
  SubmitResponse: FormGroup;
  submitted = false;
  public gameList: any;
  public starList: boolean[] = [true, true, true, true, true];
  public rating: number;
  public saveUserRatingResponse: any;
  public saveUserGameRatingResponseFlag = false;
  public listData: MatTableDataSource<any>;
  public displayedColumns: string[] = ['srno', 'gameName', 'AvgStars', 'rating'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  // method to load data into table
public LoadDatatable() {
  this._gameService.getGameList().subscribe(
    result => {
      let i = 1;
      this.gameList = result;
      // tslint:disable-next-line: no-shadowed-variable
      this.gameList.forEach(element => {
        element.stars = this.starList;
        element.srno = i;
        i = i + 1;
        const AvgRating: boolean[] = [true, true, true, true, true];
        for (let i = 0; i <= element.averageRating - 1; i++) {
          AvgRating[i] = false;
        }
        element.AvgStars = AvgRating;
      });
      this.listData = new MatTableDataSource(this.gameList);
      this.listData.paginator = this.paginator;
      this.listData.sort = this.sort;
      console.log('data has come');
    }
    , error => console.error(error));
}

  ngOnInit() {
    this.visitorForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
   this.LoadDatatable();
  }

  // method to set star(rating)
  public setStar(record: any, data: any) {
    // tslint:disable-next-line: no-shadowed-variable
    this.listData.data.forEach(element => {
      // tslint:disable-next-line: triple-equals
      if (element.gameId == record.gameId) {
        const userrating = [true, true, true, true, true];
        for (let i = 0; i <= 4; i++) {
          if (i <= data) {
            userrating[i] = false;
          } else {
            userrating[i] = true;
          }
        }
        element.stars = userrating;
      }

    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.visitorForm.controls; }
  public onSubmit() {
  const  UserGamesRating: any[] = [];
    this.submitted = true;
    // stop here if form is invalid
    if (this.visitorForm.invalid) {
      return;
    }
    let userRating = 0;
    this.listData.data.forEach(element => {

      userRating = element.stars.filter(value => value == false).length;
      if (userRating > 0) {
        const GamesRating = {
          'GameId': element.gameId,
          'Rating': userRating,
          'GameName': element.gameName
        };
        UserGamesRating.push(GamesRating);
      }
    });
    const VistorRatingUpdate = {
      'gamesRatings': UserGamesRating,
      'VisitorInfo':
      {
        'EmailId': this.visitorForm.value.email,
        'Fname': this.visitorForm.value.firstName,
        'LName': this.visitorForm.value.lastName,
      }
    };
    if (UserGamesRating.length==0)
    {
      this.notificationService.warn('Rate atleast one Game !');
      return;
    }
 this._gameService.saveUserGameRating(VistorRatingUpdate).subscribe(res => {
 this.saveUserRatingResponse = res;
 this.saveUserGameRatingResponseFlag = true;
 console.log(JSON.stringify(this.saveUserRatingResponse));
      console.log('User rating got saved');
     /// this.notificationService.warn('Rate successful done !');
      this.LoadDatatable();
    }
    );
  }
}
