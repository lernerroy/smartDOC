sap.ui.define(["sap/ui/core/ValueState"], function (ValueState) {
  "use strict";

  return {
    vendorContratStatusState: function (status) {
      switch (status) {
        case "A":
          return ValueState.Success;
        case "I":
          return ValueState.None;
        case "D":
          return ValueState.Error;
        default:
          return ValueState.None;
      }
    },
    capitalizeText: function (string) {
      if (string && string.length > 0) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      } else {
        return "";
      }
    },
    convertDate: function(dateString){
        if (dateString && dateString.length > 0){
            return moment(dateString).format('MMMM Do YYYY');
        } else {
            return "";
        }
        
    },
    isLobItemEditable: function(value){
        if (value !== null){
            return false;
        } else {
            return true;
        }
    },
    convertContractNumber: function(value){
        if (value){
            var val = `${value}`.replaceAll(',', '');
            return val;            
        } else {
            return "";
        }
    }
  };
});
