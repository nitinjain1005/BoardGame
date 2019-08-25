import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
  // class for visitor functionlaity
export class GameService {
  public game: Game[];

  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {

  }
  // get game name and its average rating
  public getGameList() {
    return this.http.get<Game[]>(this.baseUrl + 'api/Visitor/GetGamesRatings');
  }

  // Save visitor data into database
  public saveUserGameRating(VistorRatingUpdate) : Observable<any> {
    return this.http.post<any>(this.baseUrl  + 'api/Visitor/saveUserGameRating',VistorRatingUpdate,httpOptions)
    .pipe(map(res => res),
    catchError( this.handleError<any>('visitor'))
    );
  }

  private handleError<T> (operation = 'visitor', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      console.log(`${operation} failed: ${error.message}`);
      return throwError(error);
    };
  }
}

export interface Game {
  GameName: string;
  AvgRating: string;
  UserInPutRating: number;
  GameId: number;
}
