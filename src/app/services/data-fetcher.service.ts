import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { cleanData } from '../util/data-cleaner';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class DataFetcherService {
  
  points: Array<any> = [];
  districtMap: Map<String, String> = new Map<String, String>();
  pointsEventData: EventEmitter<Array<any>> = new EventEmitter();
  districtEventData: EventEmitter<Array<String>> = new EventEmitter();

  constructor() {
    this.districtMap.set("Ariyalur", "5ea0abd3d43ec2250a483a4f");
    this.districtMap.set("Chengalpattu", "5ea0abd4d43ec2250a483a61");
    this.districtMap.set("Chennai", "5ea0abd2d43ec2250a483a40");
    this.districtMap.set("Coimbatore", "5ea0abd3d43ec2250a483a4a");
    this.districtMap.set("Cuddalore", "5ea0abd3d43ec2250a483a50");
    this.districtMap.set("Dharmapuri", "5ea0abd2d43ec2250a483a43");
    this.districtMap.set("Dindigul", "5ea0abd3d43ec2250a483a4b");
    this.districtMap.set("Erode", "5ea0abd2d43ec2250a483a48");
    this.districtMap.set("Kallakurichi", "5ea0abd4d43ec2250a483a5f");
    this.districtMap.set("Kancheepuram", "5ea0abd2d43ec2250a483a41");
    this.districtMap.set("Kanniyakumari", "5ea0abd3d43ec2250a483a5c");
    this.districtMap.set("Karur", "5ea0abd3d43ec2250a483a4c");
    this.districtMap.set("Krishnagiri", "5ea0abd3d43ec2250a483a5d");
    this.districtMap.set("Madurai", "5ea0abd3d43ec2250a483a56");
    this.districtMap.set("Mayiladuthurai", "60901c5f2481a4362891d572");
    this.districtMap.set("Nagapattinam", "5ea0abd3d43ec2250a483a51");
    this.districtMap.set("Namakkal", "5ea0abd2d43ec2250a483a47");
    this.districtMap.set("Nilgiris", "5ea0abd3d43ec2250a483a49");
    this.districtMap.set("Perambalur", "5ea0abd3d43ec2250a483a4e");
    this.districtMap.set("Pudukkottai", "5ea0abd3d43ec2250a483a54");
    this.districtMap.set("Ramanathapuram", "5ea0abd3d43ec2250a483a59");
    this.districtMap.set("Ranipet", "5ea0abd4d43ec2250a483a63");
    this.districtMap.set("Salem", "5ea0abd2d43ec2250a483a46");
    this.districtMap.set("Sivagangai", "5ea0abd3d43ec2250a483a55");
    this.districtMap.set("Tenkasi", "5ea0abd4d43ec2250a483a60");
    this.districtMap.set("Thanjavur", "5ea0abd3d43ec2250a483a53");
    this.districtMap.set("Theni", "5ea0abd3d43ec2250a483a57");
    this.districtMap.set("Thiruchirapalli", "5ea0abd3d43ec2250a483a4d");
    this.districtMap.set("Thirupathur", "5ea0abd4d43ec2250a483a62");
    this.districtMap.set("Thiruvarur", "5ea0abd3d43ec2250a483a52");
    this.districtMap.set("Thoothukudi", "5ea0abd3d43ec2250a483a5a");
    this.districtMap.set("Tirunelveli", "5ea0abd3d43ec2250a483a5b");
    this.districtMap.set("Tiruppur", "5ea0abd4d43ec2250a483a5e");
    this.districtMap.set("Tiruvallur", "5ea0abd1d43ec2250a483a3f");
    this.districtMap.set("Tiruvannamalai", "5ea0abd2d43ec2250a483a44");
    this.districtMap.set("Vellore", "5ea0abd2d43ec2250a483a42");
    this.districtMap.set("Vilupuram", "5ea0abd2d43ec2250a483a45");
    this.districtMap.set("Virudhunagar", "5ea0abd3d43ec2250a483a58");
  }

  async fetchPoints(district: String, O2: boolean, ICU: boolean, normal: boolean) {
    let reqBody = {
      "searchString":"",
      "sortCondition":{"Name":1},
      "pageNumber":1,
      "pageLimit":1000,
      "SortValue":"Availability",
      "Districts":[this.districtMap.get(district)],
      "BrowserId":"16df21cb442c881ab72c041e7d704543",
      "IsGovernmentHospital":true,
      "IsPrivateHospital":true,
      "FacilityTypes":["CHO","CHC","CCC"]
    }
    let res = await axios.post('https://tncovidbeds.tnega.org/api/hospitals', reqBody);
    let results = res.data.result;

    this.points = cleanData(results, O2, ICU, normal);
    this.pointsEventData.emit(this.points);
  }

  getDistricts(): void {
    this.districtEventData.emit(Array.from(this.districtMap.keys()));
  }

}
