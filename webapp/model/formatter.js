sap.ui.define([], function () {
    "use strict";

    return {
        dateFormat: function (oDate) {
            if (oDate != null) {
                var oDate = (oDate instanceof Date) ? oDate : new Date(oDate);
                var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "dd.MM.yyyy" });

                return dateFormat.format(oDate);
            }
        },

        equipmentStatus: function (oStatus) {
            switch (oStatus) {
                case '0001':
                    return "Success";
                    break;

                case '0002':
                    return "Error";
                    break;

                case '0003':
                    return "Warning";
                    break;
            }
        },

        usrStatus: function (oStatus) {
            switch (oStatus) {
                case '0001':
                    return "Success";
                    break;

                case '0002':
                    return "Warning";
                    break;

                case '0003':
                    return "Error";
                    break;
            }
        },

        getAge: function (oDate) {
            var ageDifMs = Date.now() - oDate.getTime();
            var ageDate = new Date(ageDifMs); // miliseconds from epoch

            return Math.abs(ageDate.getUTCFullYear() - 1970);
        }
    };
});