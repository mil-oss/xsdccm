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

  getRes(res: any, fpath: string) {
    var n = this.fName(fpath)
    for (var r in res.resources) {
      if (res.resources[r].filename === n) {
        return "file/" + res.resources[r].name;
      }
    }
  }

  ngOnInit() {

  }
}
