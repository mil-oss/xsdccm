import { EventEmitter} from "@angular/core";
import { Response } from "@angular/http";
import { Error} from "./error.model";

export class ErrorService{
    errorOccurred=new EventEmitter<Error>();

    handleError(error:any){
      if(error._body){
        console.log(JSON.parse(error._body));
        const jerr=JSON.parse(error._body);
        const errorData=new Error(jerr.error.title, jerr.error.message, jerr.error.status);
        //console.log(errorData);
        this.errorOccurred.emit(errorData);
      }else{
        this.errorOccurred.emit(error);
      }
    }
}
