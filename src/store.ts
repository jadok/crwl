"use strict";
import * as fs from "fs";
import * as path from "path";
import * as mkdirp from "mkdirp";
import * as URL from "url";

import * as Rules from "./rules";

export default class Store {
    public url = "";
    public domaine = "";
    public path_folder = "";

    constructor(url: string) {
        this.url = url;
        this._extractDomaine();
        this._initFolder();
    }
    private _extractDomaine() {
        var tmp = URL.parse(this.url);
        this.domaine = tmp.hostname;
        this.path_folder = path.join("./analyzed", (this.domaine));
    }
    private _initFolder() {
        mkdirp(this.path_folder, function(err) { 
            if (err) return false;
            else return true;
        });
    }

    public createStore(name, data:Rules.Rules) {
        fs.writeFile(path.join(this.path_folder, name), data.extract().toString(), function(err) {
            if (err) {
                console.error(err);
            }
        });
    }

}