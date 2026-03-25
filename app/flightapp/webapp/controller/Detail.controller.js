sap.ui.define(["sap/ui/core/mvc/Controller"], (Controller) => {
  "use strict";

  return Controller.extend("sap.capire.app.flightapp.controller.Detail", {
    onInit() {
      this.oRouter = this.getOwnerComponent().getRouter();
      this.oRouter.getRoute("DetailRoute").attachPatternMatched(this._onRouteMatched, this);

      this.byId("edit").setEnabled(true);
      // Set the initial form to be the display one
      this._showFormFragment("FlightDetailDisplay");
    },
    _onRouteMatched: function (oEvent) {
      console.log("Route matched");
      let oArgs = oEvent.getParameter("arguments");
      //Canonical URL
      var flightpath = "/" + oArgs.flightpath;

      //bind the context of the base model to a specific flight, and not to the full entity /Flight
      this.getView().bindElement(flightpath);
    },

    _showFormFragment: function (sFragmentName) {
      var oPage = this.byId("pgDetail");
      oPage.removeAllContent();

      this.pFormFragment = this.loadFragment({
        name: "sap.capire.app.flightapp.fragment." + sFragmentName,
      });

      this.pFormFragment.then(function (oVBox) {
        oPage.insertContent(oVBox);
      });
    },
  });
});
