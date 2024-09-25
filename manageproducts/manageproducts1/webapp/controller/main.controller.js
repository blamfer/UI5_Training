
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/GroupHeaderListItem",
    "sap/m/StandardListItem",
    "sap/ui/model/Sorter"
],
    function (Controller, JSONModel, GroupHeaderListItem, StandardListItem, Sorter) {
        "use strict";

        return Controller.extend("manageproducts.controller.main", {
            onInit: function () {
                var data = {
                    alternateRowColors: true
                };

                var oModel = new JSONModel(data);
                this.getView().setModel(oModel, "myClientModel");

            },

            onBeforeRendering: function() {
                //Create a sorter for the property
                var sorter = new Sorter("Category/Name", false, function(oContext) {
                    // var data = this.getGrouping(oContext);
                    // return data;
                    return oContext.getProperty("Supplier/Name");
                }.bind(this));
                // I have to pass this sorter to the Table

                // Get the table reference
                var oTable = this.getView().byId("products");
                //get the reference of the items(aggreagation)
                oTable.getBinding("items").sort(sorter);

            },
            onAfterRendering: function() {
                
            },

            onExit: function() {

            },

            onEditPress: function (oEvent) {

                this.getView().byId("formToEditItem").bindElement(this.getView().byId("products").getSelectedContextPaths()[0]);
                this.getView().byId("editProduct").open();
            //     if (!this.pDialog) {
            //         this.pDialog = this.loadFragment({
            //             name: "manageproducts.fragment.CreateOrUpdateProduct",
            //             type: "XML"
            //         }).then(function (oDialog) {
            //             return oDialog
            //         });
            //     }
            //     this.pDialog.then(function (oDialog) {
            //         this.byId("formToEditItem").bindElement(this.getView().byId("products").getSelectedContextPaths()[0]);
            //         oDialog.open();
            //     }.bind(this))


             },

             onCreatePress: function() {
                this.getView().byId("editProduct").open();
             },

            onTableItemSelect: function () {
                this.getView().byId("editBtn").setEnabled(true);
            },

            onDialogClose: function () {
                this.getView().byId("editProduct").close();
            },

            onProductEdit: function(oEvent) {
                this.getOwnerComponent().getRouter().navTo("detail");
            },

            getGrouping: function(oContext) {
                return oContext.getProperty("Supplier/Name");

                // Vint Soda -> Exotic  -> create a group 
                //Pink Lemonde -> Exotic 
                // fat milk -> Exotic 
                // LCD - Tokoyo Traders -> create 
                //Cola -> Exotic -> create
            },

            getGroupHeader: function(oGroup) {
                return new GroupHeaderListItem({title: oGroup.key.toUpperCase() });

                //return new StandardListItem({title: oGroup.key, type:"Detail"})
            }
        });
    });
