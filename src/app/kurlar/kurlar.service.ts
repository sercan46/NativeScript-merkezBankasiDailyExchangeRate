import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: "root",
})
export class KurlarService {
    xmlFonksiyon: any;
    constructor(public http: HttpClient) {}

    fetchKur(): any {
        return this.http
            .get("https://www.tcmb.gov.tr/kurlar/today.xml", {
                responseType: "text",
            })
            .pipe(
                map((response) => {
                    this.xmldenAl(response);
                    return response;
                })
            );
    }
    xmldenAl(xML) {
        let res;

       var parseString = require("nativescript-xml2js").parseString;
        var xml = xML;
        parseString(xml, function (err, result) {
           res= result;
        });
        this.xmlFonksiyon=res
        return this.xmlFonksiyon
    }
}

