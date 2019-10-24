import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';
import { FuseConfirmDialogComponent } from '../../../../../../../@fuse/components/confirm-dialog/confirm-dialog.component';
// import { FuseConfirmDialogComponent } from '../../../../../../@fuse/components/confirm-dialog/confirm-dialog.component';
// import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
// import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-selected-bar',
  templateUrl: './selected-bar.component.html',
  styleUrls: ['./selected-bar.component.scss']
})
export class SelectedBarComponent {
    

    @Input() checkboxes: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    @Output() selectionChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(
        public _matDialog: MatDialog
    ){}

    selectionChange(value : boolean) {
        this.selectionChanged.next(value);
    }

    deleteSelectedContacts(): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete all selected rows?';

        this.confirmDialogRef.afterClosed()
            .subscribe(result => {
                if ( result ){
                    //   this.apiService.deleteSelectedContacts();
                }
                this.confirmDialogRef = null;
        });
    }
}
