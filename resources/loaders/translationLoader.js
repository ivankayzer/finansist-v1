const fs = require("fs");
const path = require("path");

module.exports = {
  getTranslations: function() {
    let translations = {};
    const dir = path.join(__dirname, "../locales");

    function getDirectories(path) {
      return fs.readdirSync(path).filter(function(file) {
        return fs.statSync(path + "/" + file).isDirectory();
      });
    }

    getDirectories(dir).forEach(locale => {
      translations[locale] = {};
      fs.readdirSync(dir + "/" + locale).forEach(file => {
        translations[locale][file.split(".")[0]] = require("./../locales/" +
          locale +
          "/" +
          file);
      });
    });

    return translations;
  }
};
