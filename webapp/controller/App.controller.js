sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel"
],
    function (BaseController, JSONModel) {
        "use strict";

        return BaseController.extend("bpcarriers.controller.App", {
            onInit: function () {
                var oViewModel = new JSONModel({
                    busy: false,
                    delay: 0,
                    equipmentTableNoDataText: this.getResourceBundle().getText("equipmentTableNoDataText"),
                    driversTableNoDataText: this.getResourceBundle().getText("driversTableNoDataText"),
                });

                this.setModel(oViewModel, "appView");

                var urlParams = new URLSearchParams(window.location.search);
                var token = urlParams.get('token');
                this.setModelTQA(token);
                if (!sessionStorage.getItem("oLangu"))
                    sap.ui.getCore().getConfiguration().setLanguage("EN");
                else {
                    sap.ui.getCore().getConfiguration().setLanguage(sessionStorage.getItem("oLangu"));
                }

                if (sessionStorage.getItem("sPathBack") != 'undefined') {
                    var sPath = sessionStorage.getItem("sPathBack");
                    sessionStorage.removeItem("sPathBack");
                    if (sPath) {
                        this.onNavigation(sPath, "resources", "/xTQAxCARRIERS_LVP");
                    }
                }
            }
        });
    });
