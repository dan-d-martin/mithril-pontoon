requirejs.config({
    "baseUrl": "js/",
    "paths": {
      "app": "app",
      "mithril": "../../bower_components/mithril/mithril"
    }
});

// Load the main app module to start the app
requirejs(["app/game"]);