import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-view-transit',
  templateUrl: './view-transit.component.html',
  styleUrls: ['./view-transit.component.scss']
})
export class ViewTransitComponent implements OnInit {

  // Data from selected row
  @Input() data: any;
  // Emitter to close the drawer
  @Output() closeButton = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  close() {
    this.closeButton.emit(true);
  }

}
