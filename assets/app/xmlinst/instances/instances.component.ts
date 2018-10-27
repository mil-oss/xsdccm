import { Component, OnInit } from '@angular/core';
import { XsdService } from '../../xsdccm/xsd.service';
import { XmlService } from '../xml.service';

@Component({
  selector: 'app-instances',
  templateUrl: './instances.component.html',
  styleUrls: ['./instances.component.css']
})
export class InstancesComponent implements OnInit {
  datetime: Date;

  constructor(public xmlService: XmlService, public xsdService: XsdService) { }

  ngOnInit() {

  }

  selectInstance(selxsd: any, i: any) {
    this.xsdService.selectedxsd = selxsd['project'];
    this.xmlService.selectedxml = i['name'];
    this.xmlService.seldocvalid = false;
    this.xsdService.validate = true;
    this.xmlService.rawmode = true;
    this.xmlService.rawview = true;
    console.log("selectInstance " + i.name);
    this.xsdService.iepdXMLResource(this.xsdService.selectedxsd, this.xmlService.selectedxml)
  }
  selectTestData(selxsd: any, d: any) {
    this.xsdService.selectedxsd = selxsd['project'];
    this.xmlService.selectedxml = d['name'];
    this.xmlService.viewmode = "xml";
    this.xmlService.validate = false;
    this.xmlService.rawmode = true;
    this.xmlService.rawview = true;
    this.xsdService.iepdXMLResource(this.xsdService.selectedxsd, this.xmlService.selectedxml)
  }

  selectXsd(selxsd: any, s: any) {
    this.xsdService.selectedxsd = selxsd['project'];
    this.xmlService.selectedxml = s['name'];
    this.xmlService.validate = false;
    this.xmlService.seldocvalid = false;
    this.xmlService.rawmode = true;
    this.xmlService.rawview = true;
    this.xsdService.iepdXMLResource(this.xsdService.selectedxsd, this.xmlService.selectedxml)
  }

  selectXsl(selxsd: any, s: any) {
    this.xsdService.selectedxsd = selxsd['project'];
    this.xmlService.selectedxml = s['name'];
    this.xmlService.validate = false;
    this.xmlService.seldocvalid = false;
    this.xmlService.rawmode = true;
    this.xmlService.rawview = true;
    this.xsdService.iepdXMLResource(this.xsdService.selectedxsd, this.xmlService.selectedxml)
  }

  xView() {
    this.xmlService.viewmode = "xml";
  }

}
