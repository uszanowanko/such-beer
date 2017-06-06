sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/m/Dialog",
    "sap/ui/layout/form/SimpleForm"
], function (Controller, Dialog, Form) {
    "use strict";

    return Controller.extend("sap.ui.demo.wt.controller.Login", {
        onInit: function() {
            console.log("oi")
            jQuery.ajax({
                url : "/api/user",
                contentType : "application/json",
                success: (data) => {
                    sap.ui.getCore().getModel().setData(data);
                    sap.ui.core.UIComponent.getRouterFor(this).navTo("vote");
                },
                error: () => {
                    this._dialogCreated? this._dialog.open() : this.createDialog();
                }
            });
            sap.ui.core.UIComponent.getRouterFor(this).getRoute("login").attachPatternMatched(this._onObjectMatched, this);
        },
        
        _onObjectMatched: function() {
            if (this._dialog) {
                setTimeout(this._dialog.open.bind(this), 1000);
            }
            console.log("om")
        },

        createDialog: function () {
            this._dialogCreated = true;
            this._nameInput = new sap.m.Input({
                submit: this.onLogin.bind(this)
            });
            this._dialog = new Dialog({
                title: "Sign-in",
                endButton: new sap.m.Button({
                    text: "Login",
                    press: this.onLogin.bind(this)
                }),
                content: [
                    new Form({
                        content: [
                            new sap.m.Label({text: "Name"}),
                            this._nameInput
                        ]
                    })
                ]
            })
            this.getView().addDependent(this._dialog);
            this._dialog.open();
        },

        onLogin: function(e) {
            var name = this._nameInput.getValue();
            jQuery.ajax({
                url : "/api/users",
                method: "POST",
                contentType : "application/json",
                data: JSON.stringify({
                    name: name
                }),
                success: () => {
                    sap.ui.core.UIComponent.getRouterFor(this).navTo("vote");
                }
            });
        }
    });
});