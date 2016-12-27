/// <reference path="_all.d.ts" />

"use strict";
import * as Rules from "./rules";

import * as cheerio from "cheerio";

export default class SEOHX implements Rules.Rules {
    public data:Array<String>;
    public $:cheerio.Static;

    constructor($:cheerio.Static) {
        this.data = [];
        this.$ = $;
    }
    public exec() {
        var that = this;
        var hx = this.$('h1, h2, h3, h4, h5, h6').each(function (i, e) {
            var ids = that.$(e).attr('id');
            ids = typeof ids === "undefined" ? "" : ids;
            var text = that.$(e).text().replace(/(\r\n|\n|\r)/gm,"");
            that.data.push(e.tagName.substr(1, 2) + ". #" + ids + "." + that.$(e).attr('class') + "->" + text);
        });
    }
    public extract() {
        var res = "";
        for (var i = 0; i < this.data.length; i++) {
            res += this.data[i] + "\n";
        }
        return res;
    }
}