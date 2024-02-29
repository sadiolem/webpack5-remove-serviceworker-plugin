const path = require("path");
const fs = require("fs");

function RemoveServiceWorkerPlugin(options) {
  this.filename = options && options.filename || 'sw.js';
}

RemoveServiceWorkerPlugin.prototype.apply = function (compiler) {
  const filename = this.filename;

  compiler.hooks.emit.tapAsync("RemoveServiceWorkerPlugin", (compilation, callback) => {
    fs.readFile(path.join(__dirname, filename), (err, content) => {
      if (err) {
        callback(err);
        return;
      }

      const source = {
        source: () => content,
        size: () => Buffer.byteLength(content, "utf8"),
      };

      compilation.emitAsset(filename, source);
      callback();
    });
  });
};
