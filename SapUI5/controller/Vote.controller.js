sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("sap.ui.demo.wt.controller.Vote", {
        _defer: [],
        onInit: function () {
            console.log("ai")
            var model = new sap.ui.model.json.JSONModel();
            this.getView().setModel(model);
            this.getView().setModel(sap.ui.getCore().getModel(),"user");
            sap.ui.core.UIComponent.getRouterFor(this).getRoute("vote").attachPatternMatched(this._onObjectMatched, this);
        },

        vote: function(e) {
            var context = e.getSource().getBindingContext().getPath(),
                entity = this.getView().getModel().getProperty(context);

            if (this._defer[context]) {
                clearTimeout(this._defer[context]);
            }
            this._defer[context] = setTimeout(() => {
                jQuery.ajax({
                    url : "/api/term/"+entity._id+"/votes",
                    method: "POST",
                    contentType : "application/json",
                    data: JSON.stringify({
                        score: entity.myScore
                    }),
                    success: (data) => {
                        entity.score = data.score;
                        this.getView().getModel().setProperty(context,entity);
                    }
                });
            }, 100);
        },
        
        onLogout: function() {
            jQuery.ajax({
                url : "/api/logout",
                method: "POST",
                contentType : "application/json",
                success: (data) => {
                    sap.ui.getCore().getModel().setData(null);
                    sap.ui.core.UIComponent.getRouterFor(this).navTo("login");
                }
            });
        },
        
        _onObjectMatched: function() {
            console.log("am")
            jQuery.ajax({
                url : "/api/user",
                contentType : "application/json",
                success: (data) => {
                    sap.ui.getCore().getModel().setData(data);
                },
                error: () => {
                    sap.ui.core.UIComponent.getRouterFor(this).navTo("login");
                }
            });
            
            jQuery.ajax({
                url : "/api/terms",
                contentType : "application/json",
                success : (data) => {
                    this.getView().getModel().setData(data);
                }
            });
        }
    });
});