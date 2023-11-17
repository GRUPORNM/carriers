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
                    pathToOpen: "",
                    appIdToOpen: '012',
                    appIdToBack: '019',
                    bHistory: true,
                    create: true
                }
                window.parent.postMessage(message, "*");
            },

            // onCreateDrivers: function () {
            //     var message = {
            //         action: "navToDrivers",
            //         pathToback: this.getModel("appView").getProperty("/sPath"),
            //         create: false
            //     }
            //     window.parent.postMessage(message, "*");
            // },


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
                debugger;
                var sPath = oEvent.oSource.getBindingContext().sPath.replace("/xTQAxBP_CARRIER_DRIVERS", "");
                var message = {
                    action: "navTo",
                    // Se true quando é chamado o navback na app aberta volta a esta app.
                    bHistory: true,
                    // url para abrir dentro por exemplo (partner='12321',usrid='321321')
                    pathToOpen: sPath,
                    // Se bHistory True é necessário preencher este campo ou o AppId com o id desta app com o caminho para voltar ex ('106252')
                    pathToBack: this.getModel("appView").getProperty("/sPath"),
                    // Se bHistory True é obrigatório este campo
                    appIdToBack: '019',

                    appIdToOpen: '013',
                    // Esta campo é apenas true quando o pathToOpen é uma página de criação. ou seja que não tenha nenhuma entidade aberta.
                    create: false
                }
                window.parent.postMessage(message, "*");
            },

            // onPressDriverDetail: function (oEvent) {
            //     debugger;
            //     var sPath = oEvent.oSource.getBindingContext().sPath.replace("/xTQAxBP_CARRIER_DRIVERS", "");
            //     var message = {
            //         action: "navToDrivers",
            //         pathToOpen: sPath,
            //         pathToback: this.getModel("appView").getProperty("/sPath"),
            //         create: true
            //     }
            //     window.parent.postMessage(message, "*");
            // },

            onPressEquipmentDetail: function (oEvent) {
                debugger;
                var sPathEquipment = oEvent.oSource.getBindingContext().sPath.replace("/xTQAxCARRIER_EQUIPMENTS", "");
                var sPath = "(request_id=guid'" + oEvent.getSource().getBindingContext().getObject().request_id + "',partner='" + oEvent.getSource().getBindingContext().getObject().parnr + "')"
                var message = {
                    action: "navTo",
                    // Se true quando é chamado o navback na app aberta volta a esta app.
                    bHistory: true,
                    // url para abrir dentro por exemplo (partner='12321',usrid='321321')
                    pathToOpen: sPath,
                    // Se bHistory True é necessário preencher este campo ou o AppId com o id desta app com o caminho para voltar ex ('106252')
                    pathToBack: this.getModel("appView").getProperty("/sPath"),
                    // Se bHistory True é obrigatório este campo
                    appIdToBack: '019',

                    appIdToOpen: '012',
                    // Esta campo é apenas true quando o pathToOpen é uma página de criação. ou seja que não tenha nenhuma entidade aberta.
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
