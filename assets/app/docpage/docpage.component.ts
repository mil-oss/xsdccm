import { Component, OnInit } from "@angular/core";
import { XsdService } from "../xsdccm/xsd.service";

@Component({
  selector: "app-docpage",
  templateUrl: "./docpage.component.html",
  styleUrls: ["./docpage.component.css"]
})
export class DocpageComponent {

  files: any = []
  svces: any = []
  configs: any = []

  docpage: any


  htmlSnippet: string = "<script>safeCode()</script>";

  constructor(public xsdService: XsdService) {

  }

  fName(path) {
    return path.substr(path.lastIndexOf('/') + 1)
  }

  ngOnInit() {
  }

  getDocs(c: any) {
    //var r = this.xsdService.iepdXMLResource(c['project'], 'dochtml');
    var xsdsel = c['project']
    if (!this.xsdService.xmldata[xsdsel]) {
      this.xsdService.xmldata[xsdsel] = []
    }
    if (this.xsdService.xmldata[xsdsel]['dochtml']) {
      return this.getBody(this.xsdService.xmldata[xsdsel]['dochtml'])
    } else {
      this.xsdService.iepdXMLResource(xsdsel, 'dochtml').subscribe(
        (docd => {
          return this.getBody(docd)
        })
      )
    }
  }
  getBody(d: string) {
    let parser = new DOMParser();
    let parsedHtml = parser.parseFromString(d, 'text/html');
    if (parsedHtml.querySelectorAll("body")) {
      let elements = parsedHtml.querySelectorAll("body");
      return elements[0].innerHTML;
    }
  }
}
