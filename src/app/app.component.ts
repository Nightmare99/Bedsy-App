import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DataFetcherService } from './services/data-fetcher.service';
import { MenuComponent } from './components/menu/menu.component';
import { MatDialog } from '@angular/material/dialog';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import Vector from 'ol/source/Vector';
import { useGeographic, fromLonLat, transform } from 'ol/proj';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';

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
  map: Map | undefined;
  markerSource: Vector = new Vector();
  markerStyle: Style = new Style({
    image: new Icon(/** @type {olx.style.IconOptions} */ ({
      anchor: [0.5, 1],
      opacity: 0.75,
      scale: [0.05, 0.05],
      src: 'assets/marker.png'
    }))
  });


  constructor(private httpClient: HttpClient, private dataFetcher: DataFetcherService, public dialog: MatDialog) {
    //this.getUserLocation(httpClient);
    useGeographic();
    dataFetcher.pointsEventData.subscribe((points) => {
      this.points = points;
      this.removePoints();
      this.points.forEach(point => {
        this.addPoint(point.lon, point.lat);
      });
    });
  }

  ngOnInit() {
    console.log(this.options);
  }

  ngAfterViewInit() {
    this.openMenu();
    this.loadMap();
  }

  loadMap() {
    this.map = new Map({
      controls: [],
      view: new View({
        center: [78.6569, 11.1271],
        zoom: 8,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: this.markerSource,
          style: this.markerStyle,
        })
      ],
      target: 'ol-map'
    });
  }

  openInfoWindow(point: any): void {
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
  }

  openMenu(): void {
    let dialogRef = this.dialog.open(MenuComponent, {
      height: '300px',
      width: '400px',
    });
  }

  addPoint(lon: number, lat: number): void {
    console.log('lon:', lon);
    console.log('lat:', lat);
    var marker = new Feature({
      geometry: new Point(transform([lon, lat], 'EPSG:4326', 'EPSG:4326')),
    });
    this.markerSource.addFeature(marker);
  }

  removePoints(): void {
    var features = this.markerSource.getFeatures();
    console.log(features)
    features.forEach((feature) => {
      this.markerSource.removeFeature(feature);
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
