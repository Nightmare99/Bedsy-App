import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterManagerService {

  O2: boolean = false;
  ICU: boolean = false;
  normal: boolean = false;
  district: String = 'Chennai';
  filtersEventData: EventEmitter<any> = new EventEmitter();

  constructor() { }

  setFilters(district: String, O2: boolean, ICU: boolean, normal: boolean): void {
    this.district = district;
    this.O2 = O2;
    this.ICU = ICU;
    this.normal = normal;
    this.filtersEventData.emit({
      O2: this.O2,
      ICU: this.ICU,
      normal: this.normal,
      district: this.district
    });
  }

  getFilters(): void {
    this.filtersEventData.emit({
      O2: this.O2,
      ICU: this.ICU,
      normal: this.normal,
      district: this.district
    });
  }

}
