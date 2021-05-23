import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataFetcherService } from './services/data-fetcher.service';
import { MenuComponent } from './components/menu/menu.component';
import { MatDialog } from '@angular/material/dialog';
import OpenLayersMap from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import Vector from 'ol/source/Vector';
import { useGeographic, transform } from 'ol/proj';
import { Feature, Overlay } from 'ol';
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
  @ViewChild('popup', {static: false}) container!: ElementRef;
  @ViewChild('popupCloser', {static: false}) closer!: ElementRef;
  @ViewChild('popupContent', {static: false}) content!: ElementRef;
  overlay: Overlay = new Overlay({});
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
  markerSource: Vector = new Vector();
  markerStyle: Style = new Style({
    image: new Icon(/** @type {olx.style.IconOptions} */ ({
      anchor: [0.5, 1],
      opacity: 1,
      scale: [0.075, 0.075],
      src: 'assets/marker.png'
    }))
  });
  map: OpenLayersMap = new OpenLayersMap({});
  infoMap: Map<String, any> | undefined;

  constructor(private dataFetcher: DataFetcherService, public dialog: MatDialog) {
    //this.getUserLocation(httpClient);
    useGeographic();
    dataFetcher.pointsEventData.subscribe((points) => {
      this.infoMap = new Map<String, any>();
      this.points = points;
      this.removePoints();
      this.points.forEach(point => {
        this.infoMap?.set(point.name, point);
        this.addPoint(point.lon, point.lat, point.name);
      });
    });
  }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.openMenu();
    this.loadMap();
  }

  loadMap() {
    this.map = new OpenLayersMap({
      controls: [],
      view: new View({
        center: [78.6569, 11.1271],
        zoom: 8.5,
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
    this.overlay = new Overlay({
      element: this.container.nativeElement,
      autoPan: true,
      autoPanAnimation: {
          duration: 250
      }
    });
    this.map.addOverlay(this.overlay);
    this.closer.nativeElement.onclick = () => {
      this.overlay.setPosition(undefined);
      this.closer.nativeElement.blur();
      return false;
    };
    this.map.on('singleclick',  (event) => {
      if (this.map.hasFeatureAtPixel(event.pixel) === true) {
          var coordinate = event.coordinate;
          this.map.forEachFeatureAtPixel(event.pixel,  (feature, layer) => {
            console.log(feature.getProperties());
            let name = feature.getProperties().name;
            let O2Color, ICUColor, normalColor;
            let O2Beds = this.infoMap?.get(name).oxygenBedsVacant,
            ICUBeds = this.infoMap?.get(name).icuBedsVacant,
            normalBeds = this.infoMap?.get(name).normalBedsVacant;
            O2Color = (O2Beds > 0)? 'green' : 'red'; 
            ICUColor = (ICUBeds > 0)? 'green' : 'red'; 
            normalColor = (normalBeds > 0)? 'green' : 'red'; 
            this.content.nativeElement.innerHTML = `
              <h1>${name}</h1>
              <br/>
              <h2>📲: ${this.infoMap?.get(name).mobile}<h2/>
              <h3>
                O2 beds: <span style="color: ${O2Color}">${O2Beds}</span><br/>
                ICU beds: <span style="color: ${ICUColor}">${ICUBeds}</span><br/>
                Normal beds: <span style="color: ${normalColor}">${normalBeds}</span><br/>
              </h3>
              `;
          });
          this.overlay.setPosition(coordinate);
      } else {
          this.overlay.setPosition(undefined);
          this.closer.nativeElement.blur();
      }
  });
  }

  openMenu(): void {
    let dialogRef = this.dialog.open(MenuComponent, {
      height: '300px',
      width: '400px',
    });
  }

  addPoint(lon: number, lat: number, name: String): void {
    var marker = new Feature({
      geometry: new Point(transform([lon, lat], 'EPSG:4326', 'EPSG:4326')),
      name: name
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
