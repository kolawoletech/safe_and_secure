import 'rxjs/Rx';
import {Injectable} from '@angular/core';
import { Config } from '../../providers/config';

import {Http} from '@angular/http';

let brokersURL = Config.SERVER_URL + 'brokers/';

@Injectable()
export class BrokerService {

    constructor(public http: Http) {

    }

    findAll() {
        alert("findall");
        return this.http.get(brokersURL)
            .map(res => res.json())
            .toPromise();
    }

    findById(id) {
        return this.http.get(brokersURL + id)
            .map(res => res.json())
            .toPromise();
    }

}
