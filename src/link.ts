"use strict";

import * as Rules from "./rules";
import * as cheerio from "cheerio";

export default class LinkData implements Rules.Rules {
    public links: Array<String>;
    public $:cheerio.Static;
    constructor(jquery:cheerio.Static) {
        this.$ = jquery;
        this.links = [];
    };
    public add(url) {
        if (this.links.indexOf(url) == -1) {
            this.links.push(url);
        }
    };

    public exec() {
        var links = this.$('a').get();
        for (let i=0; i < links.length; i++) {
            this.add((<any>this.$('a').get(i)).attribs.href);
        }
    }
    public extract() {
        var res = "";
        for (var i = 0; i < this.links.length; i++) {
            res += this.links[i] + "\n";
        }
        return res;
    }
}
