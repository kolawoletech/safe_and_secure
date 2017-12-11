
import {Injectable} from '@angular/core';
import {Http, Headers, Request, RequestOptions, RequestMethod} from '@angular/http';
import { Config } from './config';
import 'rxjs/add/operator/toPromise';

let propertiesURL = Config.SERVER_URL + 'properties/',
    favoritesURL = propertiesURL + 'favorites/';

@Injectable()
export class PropertyService {

    constructor(public http: Http) {
        this.http = http;
    }

    findAll() {
        var requestHeaders = new Headers();
        requestHeaders.append("Authorization", "Basic " + propertiesURL);
        requestHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        requestHeaders.append("Accept", "/");
        requestHeaders.append("Access-Control-Allow-Credentials", "true");
        requestHeaders.append("Upgrade-Insecure-Requests","1");
        requestHeaders.append("withCredentials","true");
        requestHeaders.append("Access-Control-Allow-Origin","http://localhost:8080");
        requestHeaders.append("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        //requestHeaders.append("Access-Control-Allow-Headers", "Content-Type,Authorization,Upgrade-Insecure-Requests");
        return this.http.request(new Request({
            method: RequestMethod.Get,
            url: propertiesURL,
            headers: requestHeaders
        }))
            .map(res => res.json())
            .toPromise();

    }

    findByName(key:string) {
        return this.http.get(propertiesURL + "?key=" + key)
            .map(res => res.json())
            .toPromise();
    }

    findById(id) {
        return this.http.get(propertiesURL + id)
            .map(res => res.json())
            .toPromise();
    }

    getFavorites() {
        return this.http.get(favoritesURL)
            .map(res => res.json())
            .toPromise();
    }

    favorite(property) {
        let body = JSON.stringify(property),
            headers = new Headers({'Content-Type': 'application/json'}),
            options = new RequestOptions({headers: headers});
        return this.http.post(favoritesURL, body, options).toPromise();
    }

    unfavorite(favorite) {
        return this.http.delete(favoritesURL + favorite.id)
            .map(res => res.json())
            .toPromise();
    }

}
