sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/m/Dialog",
    "sap/ui/layout/form/SimpleForm"
], function (Controller, Dialog, Form) {
    "use strict";

    return Controller.extend("such.beer.controller.Login", {
        onInit: function() {
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
                this._nameInput.setValue("");
                setTimeout(this._dialog.open.bind(this._dialog), 1);
            }
        },

        createDialog: function () {
            this._dialogCreated = true;
            this._nameInput = new sap.m.Input({
                required: true,
                submit: this.onLogin.bind(this)
            });
            this._dialog = new Dialog({
                title: "{i18n>signIn}",
                endButton: new sap.m.Button({
                    text: "{i18n>ok}",
                    press: this.onLogin.bind(this)
                }),
                content: [
                    new Form({
                        content: [
                            new sap.m.Label({text: "{i18n>name}"}),
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
            if (name) {
                this._nameInput.setValueState(sap.ui.core.ValueState.None)
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
            } else {
                this._nameInput.setValueState(sap.ui.core.ValueState.Error)
            }
        }
    });
});