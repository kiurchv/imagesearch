var ImageSearch = (function() {
  var SEARCH_URL = "http://images.google.com/searchbyimage?image_url=",
      DEFAULT_LOCALE = "en";

  function ImageSearch () {
    var self = this;

    ImageSearch.loadTranslations.call(this);

    safari.application.addEventListener("contextmenu", function (e) { self.handleContextMenu(e) }, false);
    safari.application.addEventListener("command", function (e) { self.performCommand(e) }, false);
  }

  ImageSearch.loadTranslations = function () {
    var self = this,
        locale = navigator.language.substring(0, 2) || DEFAULT_LOCALE,
        translationsURL = safari.extension.baseURI + 'locales/' + locale + ".json",
        xhr = new XMLHttpRequest();

    self.translations = {};

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        self.translations = JSON.parse(xhr.responseText);
      }
    };

    xhr.open("GET", translationsURL, true);
    xhr.send(null);
  }

  ImageSearch.prototype.t = function(key) {
    return this.translations[key] || key;
  }

  ImageSearch.prototype.handleContextMenu = function (event) {
    var self = this;

    if (event.userInfo && event.userInfo.nodeName === "IMG") {
      event.contextMenu.appendContextMenuItem("search", self.t("Search by image"));
    }
  }

  ImageSearch.prototype.performCommand = function (event) {
    if (event.command === "search") {
      var url = SEARCH_URL + event.userInfo.src,
          tab = safari.application.activeBrowserWindow.openTab("foreground");
          tab.url = url;
    }
  }

  return ImageSearch;
})();
