import { Component, OnInit, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-test-template',
  templateUrl: './test-template.component.html',
  styleUrls: ['./test-template.component.scss']
})
export class TestTemplateComponent implements OnInit {

  @ContentChild(TemplateRef)
  template: TemplateRef<any>;

  @Input()
  items: any[] = [];
  
  constructor() { }

  ngOnInit() {
  }

  
}
