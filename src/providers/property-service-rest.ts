import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Config } from '../../providers/config';

let propertiesURL = Config.SERVER_URL + 'properties/',
    favoritesURL = propertiesURL + 'favorites/';

@Injectable()
export class PropertyService {

    constructor(public http: Http) {
        this.http = http;
    }

    findAll() {
        return this.http.get(propertiesURL)
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
