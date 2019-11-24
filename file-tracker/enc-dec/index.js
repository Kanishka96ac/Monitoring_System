const chokidar = require("chokidar");
var fs = require("fs");
const crypto = require('crypto');

startWatcher();

function startWatcher() {
 
  const watcher = chokidar.watch("D:/Official", {
    ignored: /(^|[\/\\])\../,
    persistent: true
  });

  // Add event listeners.
  watcher
    .on("add", path => Enc(path));
}

function Enc(path) {
    console.log('File :'+path)
}
