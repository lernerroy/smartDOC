sap.ui.define(["sap/ui/core/ValueState"], function (ValueState) {
  "use strict";

  return {
    vendorContratStatusState: function (status) {
      switch (status) {
        case "active":
          return ValueState.Success;
        case "inactive":
          return ValueState.None;
        case "deleted":
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
        
    }
  };
});
