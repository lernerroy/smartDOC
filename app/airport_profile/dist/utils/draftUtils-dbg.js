sap.ui.define(["sap/m/MessageBox"], function (MessageBox) {
  "use strict";

  return {
    handleDraftSaveChanges: function (
      resourceBundle,
      callbacks
    ) {
      var lv_warning = resourceBundle.getText("draftSaveChangesMessage");
      MessageBox.warning(lv_warning, {
        actions: [
          resourceBundle.getText("draftActionKeep"),
          resourceBundle.getText("draftActionDiscard"),
          MessageBox.Action.CANCEL,
        ],
        emphasizedAction: resourceBundle.getText("draftActionKeep"),
        onClose: function (sAction) {
          if (!callbacks) {
            return;
          }
          if (sAction === resourceBundle.getText("draftActionKeep")) {
            callbacks.onKeepDraft();
          } else if (sAction === resourceBundle.getText("draftActionDiscard")) {
            callbacks.onDiscardDraft();
          } else if (sAction === MessageBox.Action.CANCEL) {
            callbacks.onCancel();
          }
        },
      });
    },
  };
});
