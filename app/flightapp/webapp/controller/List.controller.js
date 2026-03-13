sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel", "sap/m/MessageToast"], (Controller, JSONModel, MessageToast) => {
  "use strict";

  return Controller.extend("sap.capire.app.flightapp.controller.List", {
    onInit() {
      //1. Create an object to store data
      //2. Wrap it in a JSONModel
      //3. Add the model to the view

      let oNewFlight = {
        AirlineID: "",
        ConnectionID: "",
        FlightDate: null,
      };

      let oFlightModel = new JSONModel(oNewFlight);

      this.getView().setModel(oFlightModel, "form");
    },
    onAddFlight(evt) {
      let oFormModel = this.getView().getModel("form");
      let oNewData = oFormModel.getData();
      this._createFlightV4(oNewData);
    },

    _createFlightV4: function (oFlight) {
      var oDataListBinding = this.getView().byId("tblFlights").getBinding("items");

      //Return a promise for the create
      var oContext = oDataListBinding.create(oFlight);

      // Note: This promise fails only if the transient entity is canceled,
      //   i.e. deleted by either deleting the transient context or by resetting pending changes
      oContext.created().then(
        function () {
          //Flight Successfully created
          MessageToast.show("Flight added");
        },
        function (oError) {
          //Flight failed
          // handle rejection of entity creation; if oError.canceled === true then the transient entity has been deleted
          if (!oError.canceled) {
            throw oError; // unexpected error
          }
        },
      );
    },
    onNavButtonPressed(evt) {
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.navTo("Detail", { param: "Tom" });
    },
  });
});
