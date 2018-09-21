import { Component, OnInit } from '@angular/core';
import { TabletemplateDataSource } from './tabletemplate-datasource';

@Component({
  selector: 'oa-tabletemplate',
  templateUrl: './tabletemplate.component.html',
  styleUrls: ['./tabletemplate.component.css']
})
export class TabletemplateComponent implements OnInit {
  dataSource: TabletemplateDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new TabletemplateDataSource(null, null);
  }
}
