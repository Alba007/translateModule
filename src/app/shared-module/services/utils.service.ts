import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";

@Injectable(
    {
        providedIn: 'root'
    }
)
export class UtilsService {

    static getLocationHost() {
        return location.host;
    }

    static getApiUrl() {
        return environment.apiGatewayHost
    }

    static getGatewayHost() {
        return environment.apiGatewayHost
    }

    static async delay(ms: number) {
        await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
    }

    static mergeData(destination: Object, source: Object) {
        Object.keys(source).forEach(key => {
            destination[key] = source[key];
        })
    }

    objFromString(obj, str) {
        var arr = str.split('.');
        arr.forEach(el => {
            obj = obj[el];
        });
        return obj;
    }
}


