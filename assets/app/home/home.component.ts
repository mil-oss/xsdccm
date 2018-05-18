import { Component, OnInit } from "@angular/core";
import { XsdService } from "./../xsdccm/xsd.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent {

  files = [
    {
      name: "SEvA XML IEPD",
      url: this.xsdService.iepdroot + "dload",
      description:
        "Information Exchange Packet Documentation - all files in a Zip"
    },
    {
      name: "SEvA XML Reference Schema",
      url: this.xsdService.iepdhost + "ref.xsd",
      description:
        "NIEM Conformant Reference XML Schema for a Software Evidence Archive"
    },
    {
      name: "SEvA XML Ref JSON",
      url: this.xsdService.iepdhost + "ref.json",
      description:
        "JSON Representation of Software Evidence Archive Reference XML Schema"
    },
    {
      name: "SEvA XML IEPD Schema",
      url: this.xsdService.iepdhost + "iep.xsd",
      description:
        "XML Schema for Software Evidence Archive information exchange"
    },
    {
      name: "SEvA XML IEPD JSON",
      url: this.xsdService.iepdhost + "iep_xsd.json",
      description:
        "JSON Representation of Software Evidence Archive Implementation XML Schema"
    },
    {
      name: "TEST INSTANCE XML",
      url: this.xsdService.iepdhost + "test_instance.xml",
      description:
        "Software Evidence Archive XML Test Instance"
    },
    {
      name: "TEST INSTANCE JSON",
      url: this.xsdService.iepdhost + "test_instance.json",
      description:
        "JSON Representation of Software Evidence Archive XML Test Instance"
    },
    {
      name: "TEST DATA XML",
      url: this.xsdService.iepdhost + "test_data.xml",
      description:
        "XML Test data used to generate Test Instances"
    },
    {
      name: "GOLANG STRUCT",
      url: this.xsdService.iepdhost + "xsd-struct.go",
      description:
        "Auto-generated code structure for marshalling and unmarshalling XML Instances using Golang"
    },
    {
      name: "GOLANG TEST",
      url: this.xsdService.iepdhost + "xsd-test.go",
      description:
        "Auto-generated code test for marshalling and unmarshalling XML Instances using Golang"
    },
    {
      name: "SEvA Resource Paths",
      url: this.xsdService.iepdhost + "resources.json",
      description:
        "File names and paths in JSON format"
    }
  ];

  constructor(public xsdService: XsdService) {

  }

  ngOnInit() {

  }
}