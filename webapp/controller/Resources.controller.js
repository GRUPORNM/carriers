sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType"
],
    function (BaseController, JSONModel, formatter, Filter, FilterOperator, FilterType) {
        "use strict";

        return BaseController.extend("bpcarriers.controller.Resources", {

            formatter: formatter,

            onInit: function () {
                var oViewModel = new JSONModel({
                    busy: false,
                    delay: 0
                });

                this.setModel(oViewModel, "resourcesView");
                this.getOwnerComponent().getRouter().attachRouteMatched(this.onObjectMatched, this);
                this.getRouter().attachRouteMatched(this.getUserAuthentication, this);
            },

            onCreateEquipments: function () {
                var message = {
                    action: "navTo",
                    pathToBack: this.getModel("appView").getProperty("/sPath"),
                    pathToOpen: "#/NewEntry",
                    appIdToOpen: '012',
                    appIdToBack: '019',
                    bHistory: true,
                    create: true
                }
                window.parent.postMessage(message, "*");
            },

            onAfterRendering: function () {
                var that = this;
                sessionStorage.setItem("goToLaunchpad", "");
                window.addEventListener("message", function (event) {
                    var data = event.data;
                    if (data.action == "goToMainPage") {
                        that.onNavBack();
                    }
                });
            },


            onCreateDrivers: function () {
                var message = {
                    action: "navTo",
                    pathToBack: this.getModel("appView").getProperty("/sPath"),
                    pathToOpen: "#/NewEntry",
                    appIdToOpen: '013',
                    appIdToBack: '019',
                    bHistory: true,
                    create: true
                }
                window.parent.postMessage(message, "*");
            },

            onPressDriverDetail: function (oEvent) {
                var sPath = oEvent.oSource.getBindingContext().sPath.replace("/xTQAxBP_CARRIER_DRIVERS", "");
                var message = {
                    action: "navTo",
                    bHistory: true,
                    pathToOpen: sPath,
                    pathToBack: this.getModel("appView").getProperty("/sPath"),
                    appIdToBack: '019',
                    appIdToOpen: '013',
                    create: false
                }
                window.parent.postMessage(message, "*");
            },


            onPressEquipmentDetail: function (oEvent) {
                var sPath = "(request_id=guid'" + oEvent.getSource().getBindingContext().getObject().request_id + "',partner='" + oEvent.getSource().getBindingContext().getObject().parnr + "')"
                var message = {
                    action: "navTo",
                    bHistory: true,
                    pathToOpen: sPath,
                    pathToBack: this.getModel("appView").getProperty("/sPath"),
                    appIdToBack: '019',
                    appIdToOpen: '012',
                    create: false
                }
                window.parent.postMessage(message, "*");
            },

            onSearchDriversChange: function (oEvent) {
                var sQuery = oEvent.getParameter("query");

                this.byId("driversTable").getBinding("items").filter(new Filter({
                    filters: [
                        new Filter("name", FilterOperator.Contains, sQuery),
                        new Filter("contact", FilterOperator.Contains, sQuery),
                        new Filter("landx", FilterOperator.Contains, sQuery)
                    ],
                    and: false,
                }), FilterType.Application);
            },

            onSearchEquipmentsChange: function (oEvent) {
                var sQuery = oEvent.getParameter("query");

                this.byId("equipmentsTable").getBinding("items").filter(new Filter({
                    filters: [
                        new Filter("eqktx", FilterOperator.Contains, sQuery),
                        new Filter("eartx", FilterOperator.Contains, sQuery),
                        new Filter("equi_status_desc", FilterOperator.Contains, sQuery)
                    ],
                    and: false,
                }), FilterType.Application);
            }
        });
    });
