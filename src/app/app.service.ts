import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {
    constructor(private _http: Http) { }

    public GetList() {
        return this._http.get("https://raw.githubusercontent.com/veysel/developer-api-info/master/developer-api-info.json").map(x => x.json());
    }
}