import { Component, OnInit } from "@angular/core";
import { XsdService } from "./../xsdccm/xsd.service";

@Component({
  selector: "app-home",
  templateUrl: "./provrpt.component.html",
  styleUrls: ["./provrpt.component.css"]
})
export class ProvrptComponent {

  constructor(public xsdService: XsdService) {
  }

  provRpts: any[][] = []

  getReport(xsdsel) {
    console.log("xsdsel " + xsdsel)
    if (this.xsdService.jsonResource(xsdsel,'provenancereportjson')) {
      return this.xsdService.jsondata[xsdsel]['provenancereportjson']
    } else {
      this.xsdService.iepdJsonResource(xsdsel, 'provenancereportjson').subscribe(
        (docd => {
          return docd
        })
      )
    }
  }

  toArray(n) {
    var a = []
    for (var i in n) {
      a.push(n[i])
    }
    console.log(a)
    return a
  }

  fName(path: string) {
    return path.split('\\').pop().split('/').pop();
  }

  getRes(resname: string) {
    return this.xsdService.Resources[this.xsdService.selectedxsd][this.fName(resname)];
  }

  ngOnInit() {

  }
}
