import { Component, OnInit } from '@angular/core';
import { XmlService } from '../../xml.service';

@Component({
  selector: 'app-instance',
  templateUrl: './instance.component.html',
  styleUrls: ['./../instances.component.css', 'instance.component.css']
})
export class InstanceComponent implements OnInit {

  jsondata: any;
  lt: string = '<';
  ct: string = '</';
  rt: string = '>';

  constructor(public xmlService: XmlService) {
  }

  ngOnInit() {
  }

  xmlView() {
    this.xmlService.viewmode = "xml";
 }

  jsonView() {
    this.xmlService.viewmode = "json";
    this.xmlService.rawview=true;

  }

  getAttributes(atts) {
    var str: String = "";
    for (var a in atts) {
      str = str + " " + a + "=\"" + atts[a] + "\"";
    }
    return str;
  }

  tog(val) {
    if (this.xmlService.isOpenTab(val)) {
      return "-"
    } else {
      return "+"
    }
  }
}
