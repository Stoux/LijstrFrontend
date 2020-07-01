import { Component, Input, OnInit } from '@angular/core';
import { ShowDetail } from '../../models/show';

@Component({
  selector: 'lijstr-show-detail-table',
  templateUrl: './show-detail-table.component.html',
  styleUrls: ['./show-detail-table.component.css']
})
export class ShowDetailTableComponent implements OnInit {

  @Input() show: ShowDetail;

  constructor() { }

  ngOnInit(): void {
  }

}
