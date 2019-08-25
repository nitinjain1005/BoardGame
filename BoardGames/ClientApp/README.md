# BoardGames

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


**********************************************************************
Website "My Favorite Board Games" Created

## Prereuisite
Visual studio 
2017, Visual studio code, SQL server, Angular cli,.Net core

## Functionality of website
1. Login Functionality for Admin : Used JWT Token
2. Admin Page for Create and Delete Games and search games. Also showing "Visitor Count" in popup window on click
3. Visitor Page for Giving Rating to the favourite game by putting visitor information, Ratings and submit.

## Technologies Used
C#, .NetCore2.2, MVC, Entity Framework, Angular 7, Sass, Bootstrap, SQL server, Database on Azure, Visual studio 
2017, Visual studio code

## Features
1. Used Angular Material Data Table which includes header, sorting and pagination
2. Angular Notification service for showing alert message like successful and deleted game.
3. Angulat Material dialog box.

## How it works

Visitor:

Visitor will come and put its information like Name, Email and give Ratings and submit the rating.
-- Message will be show for successful submission
-- Also, If same visitor tries to give rating for same game multiple times, then warn message will be shown below user personal info.

Login:

Admin will have login features, will provide their credentials, 
If successful: notified and will be redirect to "Admin Page". 
If unsuccessful: notified with error message. 
session is maintained. 
JWT token is implemented for security purpose.

Admin:

Admin will be able to see all visitor rating count against each game. 
Onclick of count, Popup will be shown with visitor details in a grid
Admin can add the game on click of "+Create".
Admin can delete the game
Admin can search the game








