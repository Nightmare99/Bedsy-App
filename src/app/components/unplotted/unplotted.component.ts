import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-unplotted',
  templateUrl: './unplotted.component.html',
  styleUrls: ['./unplotted.component.scss']
})
export class UnplottedComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {}

}
