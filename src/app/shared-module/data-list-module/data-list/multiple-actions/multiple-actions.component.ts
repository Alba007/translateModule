import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatCheckboxChange } from '@angular/material';

@Component({
  selector: 'app-multiple-actions',
  templateUrl: './multiple-actions.component.html',
  styleUrls: ['./multiple-actions.component.scss']
})
export class MultipleActionsComponent implements OnInit {
  
  @Input() multiple_actions; 
  @Input() data;
  
  @Output() multipleActionEmiter = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  handleFiredMultipleAction(action) {
    this.multipleActionEmiter.emit(action);
  }
  /*
  *======================== Checkboxes =========================
  */
 private allItemsChecked: boolean = false;

 checkAllItems(event: MatCheckboxChange) {
   if (event.checked) {
     this.allItemsChecked = true;
     this.data.forEach((element: any) => {
       element.data_table_checked = true;
     });
   } else {
     this.allItemsChecked = false;
     this.data.forEach((element: any) => element.data_table_checked = false);
   }
 }

//  handleCheck(item) {
//    console.log(item);

//    item.data_table_checked = !item.data_table_checked;
//  }

 /*======================== Checkboxes =========================*/

}
