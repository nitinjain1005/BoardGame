import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
  // class for admin functionality
export class AdminService {
  private _rowData:any;
  get rowData():any {
    return this._rowData;
}
set rowData(theBar:any) {
    this._rowData = theBar;
}
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) { }

  public GetVisitorGamesRatingDetails() {
    return this.http.get<VisitorGameCollection[]>(this.baseUrl + 'api/Admin/GamesVisitorRatings');
 }

 // Add Game on click of "+Add Game"
 public AddGame(GameName: string) {
  const headers = new HttpHeaders().set('content-type', 'application/json');
  var body = {
    GameName: GameName,
    CreatedBy: "Admin"
  }
  return this.http.post<any>(this.baseUrl + 'api/Admin/AddGame', body, {
    headers});
}

  // Delete the game
 public DeleteGame(GameId: number) {
  return this.http.delete<any>(this.baseUrl + 'api/Admin/DeleteGame?gameId='+GameId);
}
}

export interface VisitorGameCollection
{
  GameName: string;
  GameId: number;
  VisitorCount:number;
  Visitors:visitorDetails[]

}
export interface visitorDetails
{
  VisitorName :string,
  VisitorRating : number;

}
