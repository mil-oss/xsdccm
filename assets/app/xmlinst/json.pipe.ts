import * as vkbeautify from 'vkbeautify';
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'json'
})
export class JsonPipe implements PipeTransform {
    transform(value: string): string {
        return vkbeautify.json(value);
    }
}