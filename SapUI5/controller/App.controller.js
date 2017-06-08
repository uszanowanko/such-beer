sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("such.beer.controller.App", {
        onInit: function() {
            sap.ui.getCore().setModel(new sap.ui.model.json.JSONModel());
        }
	});

});
