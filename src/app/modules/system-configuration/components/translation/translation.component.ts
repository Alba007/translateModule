import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableOptions } from '../../../custom-data-table/models/data-table-options';
import { MatDialogConfig, MatDialog, MatDrawer } from '@angular/material';
import { AddLanguageComponent } from '../add-language/add-language.component';
import { LanguageService } from '../../services/language.service';
import { AddKeysComponent } from '../add-keys/add-keys.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss']
})
export class TranslationComponent implements OnInit {

  options: DataTableOptions = {
    title: 'Translation',
    dynamicColumns: ['language', 'key', 'value'],
    secondaryDynamicColumns: [],
    actions: ['actions'],
    showActions: true,
    // edit and delete are default add more from here
    rowActions: [],
    // actions that are at the top of the table
    tableActions: [
      { icon: 'addKeys', name: 'Add Keys', type: 'CustomSvg' },
      { icon: 'import_export', name: 'Import' },
      { icon: 'save_alt', name: 'Download' }
    ],
    multipleActions: [
      { icon: 'edit', name: 'test edit' }
    ],
    select: ['select'],
    showSelect: true,
    extraDetail: ['expandedDetail'],
    showExtraDetail: true,
    showSearchFilter: true,
    searchFilters: [
      { name: 'language' },
      { name: 'key' },
      { name: 'value' },
      { type: 'date', name: 'date' },
      { name: 'one' },
      { type: 'date', name: 'two' },
      { type: null, name: 'three' },
    ],
    paginatorOptions: {
      pageIndex: 0,
      pageSize: 10,
      pageSizeOptions: [1, 5, 10, 25, 200],
    },
    datasource: [
      {
        language: 'sq', key: "name", value: "emer"
      },
      {
        language: 'sq', key: "surname", value: "mbiemer"
      }
    ],
  };

  rowData: any;

  @ViewChild('drawer') drawer: MatDrawer;

  testVar: boolean = true;

  constructor(
    private dialog: MatDialog,
    private languageService: LanguageService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.languageService.getJSON().subscribe(data => {
      console.log(data);
    });
  }

  test() {
    this.testVar = !this.testVar;
    console.log(this.testVar);

  }

  /**Recive data from child component APP-TABLE */
  receiveMessage($event) {
    console.log($event);

    switch ($event.type) {
      case 'add': {
        this.addLanguage();
        break;
      }
      case 'edit': {
        this.rowData = $event.row;
        /** Fixed the problem when mode is side (drawer goes over) */
        setTimeout(() => {
          this.drawer.open();

        }, 200);

        break;
      }
      case 'delete': {
        // this.deleteRole($event.row);
        break;
      }
      case 'filter': {
        // this.apiService.getData($event).subscribe((data) => {
        //   // console.log(data);
        //   this.options.datasource = data;
        // });
        break;
      }
      case 'view': {
        // this.rowData = $event.row;

        /** Fixed the problem when mode is side (drawer goes over) */
        // setTimeout(() => {
        //   this.drawer.open();
        // }, 200);

        break;
      }

      case 'Add Keys': {

        this.addKeys();

        break;
      }
    }
  }

  /** Add new Language */
  addLanguage() {
    /** Dialog Configuration */
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.data = role;
    dialogConfig.width = 500 + 'px';
    // dialogConfig.panelClass = 'custom-dialog-container';

    const dialogRef = this.dialog.open(AddLanguageComponent, dialogConfig);
    dialogRef.afterClosed()
      .subscribe((data) => {
        console.log('prgj', data);
        // this.options.datasource.push(...data);
        // this.options = { ...this.options };

        /** Update table content */
        // this.loadRoles();

      }
      );
  }

  /** Add new Keys */
  addKeys() {
    /** Dialog Configuration */
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.data = role;
    dialogConfig.width = 500 + 'px';
    // dialogConfig.panelClass = 'custom-dialog-container';

    const dialogRef = this.dialog.open(AddKeysComponent, dialogConfig);
    dialogRef.afterClosed()
      .subscribe((data) => {
        // console.log('prgj', data);
      }
      );
  }

//   generateDownloadJsonUri() {
//     let resJsonResponse = { a: 'b', c: 'd'}
//     var theJSON = JSON.stringify(resJsonResponse);
//     var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
//     this.downloadJsonHref = uri;
// }
}
