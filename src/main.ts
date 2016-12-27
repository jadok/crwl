/// <reference path="_all.d.ts" />
"use strict";
import * as http from "http";
import * as cheerio from "cheerio";
import * as fs from "fs";
import * as mkdirp from "mkdirp";

import LinkData from "./link";
import SEOXData from "./seohx";
import StoreData from "./store";

var url = process.argv[2];

http.get(url, function(res) {
  console.log("Got response: " + res.statusCode);
  let rawData = '';
  res.on('data', (chunk) => rawData += chunk);
  res.on('end', () => {
    try {
      var $ = cheerio.load(rawData);
      console.log("Page title:  " + $('title').text(), process.argv[2]);
      var stores = new StoreData(process.argv[2]);
      var link = new LinkData($);
      link.exec();
      var hn = new SEOXData($);
      hn.exec();

      console.log("Links used:", link.links);
      console.log("SEOX used:", hn.data);
      stores.createStore("link", link);
      stores.createStore("seox", hn);
    } catch (e) {
      console.log("fail", e.message);
    }
  });
}).on('error', function(e) {
    console.log("Got error: " + e.message);
});
