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

  constructor(public xmlService: XmlService,public xsdService: XsdService) { }
  
  ngOnInit() {
    if (!this.xmlService.xmldata.Instances.Default) {
      this.xmlService.getInstance({name:"Test Instance 1"});
      this.xmlService.getInstance({name:"Test Instance 2"});
      this.xmlService.getTestData({name:"Test Dataset 1"});
      this.xmlService.getTestData({name:"Test Dataset 2"});
    }
  }
  
  selectInstance(i) {
    this.xmlService.selectedxml = i;
    this.xmlService.seldocvalid = false;
    this.xmlService.rawmode=false;
    if (typeof i.json === "string") {
      this.xmlService.selectedxml.json = JSON.parse(i.json);
    }
    this.xmlService.validate=true;
    console.log("selectInstance " + i.name);
    this.xmlService.validateXml({xmlname:i.name,xmlstr:i.content,xsdname:"iep.xsd"});
    this.xmlService.verifyStr(i.file,i.content);
  }
  
  selectTestData(d) {
    this.xView()
    this.xmlService.validate=false;
    this.xmlService.rawmode=false;
    this.xmlService.rawview=true;
    d.content=this.xsdService.xmldata[d.file];
    this.xmlService.selectedxml = d;
    if (typeof d.json === "string") {
      this.xmlService.selectedxml.json = JSON.parse(d.json);
    }
    this.xmlService.verifyStr(d.file,d.content);
  }
  
  selectXsd(s) {
    this.xmlService.validate=false;
    this.xmlService.seldocvalid = false;
    this.xmlService.rawmode=true;
    this.xmlService.rawview=true;
    s.content=this.xsdService.xmldata[s.file];
    this.xmlService.selectedxml = s;
    //this.xmlService.validateXml({xmlname:s.file,xmlstr:this.xsdService.xmldata[s.file],xsdname:"XMLSchema.xsd"})
    this.xmlService.verifyStr(s.file,this.xsdService.xmldata[s.file]);
  }
  
  selectXsl(s) {
    this.xmlService.validate=false;
    this.xmlService.seldocvalid = false;
    this.xmlService.selectedxml = s;
    this.xmlService.rawmode=true;
    this.xmlService.rawview=true;
    s.content=this.xsdService.xmldata[s.name];
    this.xmlService.verifyStr(s.name,s.content);
  }
  
  xView() {
    this.xmlService.viewmode = "xml";
  }

}
