import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { SvgIcons } from '../models/svg-icons';
import { ConfigSvgIcons } from '../utils/config-svg-icons';
export interface Icons {
  name: string;
  path: string;
}
@Injectable({
  providedIn: 'root'
})
export class IconsService {
  
  icons: SvgIcons[];

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) { 
    this.icons = ConfigSvgIcons;
  }

  /*
   * Here you can register custom SVG icons 
  */
  // icons: Icons[] = [
  //   { name: 'pdf', path: '../../../assets/datatable-icons/pdf.svg' },
  //   { name: 'xml', path: '../../../assets/datatable-icons/xls.svg' },
  //   { name: 'cvs', path: '../../../assets/datatable-icons/csv.svg' },
  //   { name: 'settings', path: '../../../assets/system-config-module/repairing-service.svg' }
  // ];

  register() {
    this.icons.forEach(icon => {
      this.matIconRegistry.addSvgIcon(
        icon.name,
        this.domSanitizer.bypassSecurityTrustResourceUrl(icon.path)
      );
    });
  }
}
