import { EventEmitter } from "@angular/core";
import { Error } from "./error.model";
export class ErrorService {
    constructor() {
        this.errorOccurred = new EventEmitter();
    }
    handleError(error) {
        if (error._body) {
            console.log(JSON.parse(error._body));
            const jerr = JSON.parse(error._body);
            const errorData = new Error(jerr.error.title, jerr.error.message, jerr.error.status);
            //console.log(errorData);
            this.errorOccurred.emit(errorData);
        }
        else {
            this.errorOccurred.emit(error);
        }
    }
}
