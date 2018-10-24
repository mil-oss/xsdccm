
export class Config {
    public project: string;
    public title: string;
    public pckg: string;
    public root: string;
    public host: string;
    public xsds: Xsds;
    public files: FileInfo[];
}

export class Xsds {
    public RefXsd: XsdInfo;
    public IepXsd: XsdInfo;
}

export class XsdInfo {
    public name: string;
    public value: string;
    public file: string;
    public root: string;
}

export class FileInfo {
    public name: string;
    public url: string;
    public description: string;
}

export class Element {
    public name: string;
    public xpath: string;
    public comment: string;
}

export class SimpleType {
    public name: string;
    public comment: string;
}

export class ComplexType {
    public name: string;
    public comment: string;
}

export class XsdAppinfo {
    public Element?: Element;
    public SimpleType?: SimpleType;
    public ComplexType?: ComplexType;
    public Choice?: XsdElement[];
}

export class XsdEnumeration {
    public value: string;
    public dataitem: string;
    public documentation: string;
}

export class XsdElement {
    public xsdnode?: string;
    public ref?: string;
    public name?: string;
    public type?: string;
    public minOccurs?: number;
    public maxOccurs?: number;
    public nillable?: string;
    public documentation?: string;
    public appinfo?: XsdAppinfo;
}

export class XsdSimpleType {
    public xsdnode?: string;
    public name?: string;
    public documentation?: string;
    public appinfo?: XsdAppinfo;
    public datatype?: string;
    public pattern?: string;
    public minInclusive?: number;
    public maxInclusive?: number;
    public minExclusive?: number;
    public maxExclusive?: number;
    public length?: number;
    public minLength?: number;
    public maxLength?: number;
    public fractionDigits?: number;
    public totalDigits?: number;
    public enumerations?: XsdEnumeration[];
}

export class XsdComplexType {
    public xsdnode?: string;
    public name?: string;
    public datatype?: string;
    public documentation?: string;
    public sequence?: XsdElement[];
    public choice?: XsdElement[];
    public appinfo?: XsdAppinfo;
}

export class XsdSchema {
    public simpletypes?: XsdSimpleType[];
    public complextypes?: XsdComplexType[];
    public elements?: XsdElement[];
}


