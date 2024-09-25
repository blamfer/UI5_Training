sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("manageproducts.controller.main", {
      onInit: function () {
        var data = {
          alternateRowColors: true,
        };

        var oModel = new JSONModel(data);
        this.getView().setModel(oModel, "myClientModel");
      },
      onEditPress: function (oEvent) {
        this.getView()
          .byId("formToEditItem")
          .bindElement(
            this.getView().byId("products").getSelectedContextPaths()[0]
          );
        this.getView().byId("editProduct").open();
      },
      onTableItemSelect: function () {
        this.getView().byId("editBtn").setEnabled(true);
      },
      onDialogClose: function () {
        this.getView().byId("editProduct").close();
      },
    });
  }
);
