import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-unplotted-item',
  templateUrl: './unplotted-item.component.html',
  styleUrls: ['./unplotted-item.component.scss']
})
export class UnplottedItemComponent implements OnInit {

  @Input('item') item: any;

  constructor() { }

  ngOnInit(): void {
  }

}
