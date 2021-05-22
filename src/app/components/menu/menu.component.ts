import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataFetcherService } from 'src/app/services/data-fetcher.service';
import { FilterManagerService } from 'src/app/services/filter-manager.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  ICU: any;
  O2: any;
  normal: any;
  districts: Array<String> = [];
  district: String = 'Chennai';

  constructor(
    private dataFetcher: DataFetcherService, 
    public dialogRef: MatDialogRef<MenuComponent>,
    private filterManager: FilterManagerService
  ) { }

  ngOnInit(): void {

    this.filterManager.filtersEventData.subscribe(data => {
      this.O2 = data.O2;
      this.ICU = data.ICU;
      this.normal = data.normal;
      this.district = data.district;
    });
    this.filterManager.getFilters();
    this.dataFetcher.districtEventData.subscribe(districts => {
      this.districts = districts;
    });
    this.dataFetcher.getDistricts();

  }

  applyFilters(): void {

    this.dataFetcher.fetchPoints(this.district, this.O2, this.ICU, this.normal);
    this.filterManager.setFilters(this.district, this.O2, this.ICU, this.normal);
    this.dialogRef.close();    

  }

}
