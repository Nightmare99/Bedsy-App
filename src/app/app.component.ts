import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DataFetcherService } from './services/data-fetcher.service';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MenuComponent } from './components/menu/menu.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'bedsy';
  myPos: any;
  apiLoaded: any;
  options: any = {
    disableDefaultUI: true,
    height: '700px',
    center: {
      lat: 11.1271,
      lng: 78.6569
    },
    zoom: 8
  };
  points: Array<any> = [];
  hospitalName: String = '';
  mobile: String = '';
  landline: String = '';
  mapLink: String = '';
  O2Beds: number = 0;
  ICUBeds: number = 0;
  normalBeds: number = 0;
  O2BedsTotal: number = 0;
  ICUBedsTotal: number = 0;
  normalBedsTotal: number = 0;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  constructor(private httpClient: HttpClient, private dataFetcher: DataFetcherService, public dialog: MatDialog) {
    //this.getUserLocation(httpClient);
    //dataFetcher.fetchPoints();
    dataFetcher.pointsEventData.subscribe((points) => {
      this.points = points;
    });
    this.loadMap(httpClient);
  }

  ngOnInit() {
    console.log(this.options);
  }

  ngAfterViewInit() {
    this.openMenu();
  }

  loadMap(httpClient: HttpClient) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY', 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
        );
  }

  openInfoWindow(marker: MapMarker, point: any): void {
    this.hospitalName = point.name;
    this.mobile = point.mobile;
    this.landline = point.landline;
    this.mapLink = point.mapLink;
    this.O2Beds = point.oxygenBedsVacant;
    this.O2BedsTotal = point.oxygenBedsAllotted;
    this.ICUBeds = point.icuBedsVacant;
    this.ICUBedsTotal = point.icuBedsAlotted;
    this.normalBeds = point.normalBedsVacant;
    this.normalBedsTotal = point.normalBedsAlloted;
    this.infoWindow.open(marker);
  }

  openMenu(): void {
    let dialogRef = this.dialog.open(MenuComponent, {
      height: '300px',
      width: '400px',
    });
  }

  // getUserLocation(httpClient: HttpClient) {  
  //   if (navigator.geolocation) {  
  //     navigator.geolocation.getCurrentPosition((position: any) => {  
  //       if (position) {  
  //         this.myPos = { 
  //           lat: position.coords.latitude,  
  //           lng: position.coords.longitude
  //         }
  //         console.log(this.myPos);
  //         this.options.center = this.myPos;
  //         this.loadMap(httpClient);
  //       }
  //     });  
  //   }  
  // };   

}
