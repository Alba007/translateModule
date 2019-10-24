import { Component, OnInit } from '@angular/core';
import { ConfigNavLinks } from '../../utils/config-nav-links';
import { NavLinks } from '../../models/nav-links';
import { fuseAnimations } from '../../../../../../@fuse/animations';

@Component({
  selector: 'app-system-config-container',
  templateUrl: './system-config-container.component.html',
  styleUrls: ['./system-config-container.component.scss'],
  animations: fuseAnimations,
})
export class SystemConfigContainerComponent implements OnInit {

  // navLinks = [
  //   { path: 'translation', label: 'Language' },
  //   { path: 'settings', label: 'Settings' },

  // ];
  navLinks: NavLinks[];

  constructor() { }

  ngOnInit() {
    this.navLinks = ConfigNavLinks;
  }

}
