sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("such.beer.controller.Vote", {
        _defer: [],
        onInit: function () {
            this.getView().setModel(new sap.ui.model.json.JSONModel());
            this.getView().setModel(new sap.ui.model.json.JSONModel({name: null, date: null}), "newTerm");
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
        
        onAddTerm: function() {
            jQuery.ajax({
                url : "/api/terms",
                method: "POST",
                contentType : "application/json",
                data: JSON.stringify(this.getView().getModel("newTerm").getData()),
                success: (data) => {
                    var terms = this.getView().getModel().getData(),
                        dummyTerm = terms.pop();
                    terms.push(data);
                    terms.push(dummyTerm);
                    this.getView().getModel().setData(terms)
                }
            });
            this.getView().getModel("newTerm").setData({name: null, date: null});
        },
        
        _onObjectMatched: function() {
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
                    data.push({});//dummy object to display empty tile
                    this.getView().getModel().setData(data);
                }
            });
        }
    });
});